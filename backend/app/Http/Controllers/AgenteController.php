<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\AgenteProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AgenteController extends Controller
{
    /**
     * Listar todos los agentes
     */
    public function index(Request $request)
    {
        try {
            $query = Usuario::agentes()->with('agenteProfile');

            // Filtro por búsqueda
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                      ->orWhere('correo', 'like', "%{$search}%")
                      ->orWhere('docUsuario', 'like', "%{$search}%");
                });
            }

            // Filtro por estado activo (ahora en la tabla usuarios)
            if ($request->filled('activo')) {
                $query->where('activo', (bool) $request->activo);
            }

            $agentes = $query->get();

            // Transformar para compatibilidad con el frontend
            $agentes->map(function($usuario) {
                $profile = $usuario->agenteProfile;
                $usuario->idRol = 3;
                $usuario->carrera = $profile->carrera ?? null;
                $usuario->especialidad = $profile->especialidad ?? null;
                $usuario->biografia = $profile->biografia ?? null;
                $usuario->experiencia_anos = $profile->experiencia_anos ?? 0;
                $usuario->nitInmobiliaria = $profile->nitInmobiliaria ?? null;
                $usuario->ciudad = $usuario->ciudad ?? null; // Ya viene de Usuario
                $usuario->activo = (bool) $usuario->activo; // De Usuario
                $usuario->estado = $usuario->activo ? 'Activo' : 'Inactivo';
                
                // Simulación para dashboard
                $usuario->propiedades = rand(5, 20);
                $usuario->ventas = rand(3, 15);
                return $usuario;
            });

            return response()->json($agentes, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener agentes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear nuevo agente
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'docUsuario' => 'required|string|max:20|unique:usuarios,docUsuario',
                'nombre' => 'required|string|max:120',
                'direccion' => 'nullable|string|max:200',
                'correo' => 'required|email|max:180|unique:usuarios,correo',
                'telefono' => 'nullable|string|max:30',
                'genero' => 'nullable|string|in:Masculino,Femenino,Otro',
                'password' => 'required|string|min:8',
                // Campos de perfil
                'nitInmobiliaria' => 'nullable|string|max:20',
                'activo' => 'sometimes|boolean',
                'carrera' => 'nullable|string|max:100',
                'ciudad' => 'nullable|string|max:100',
                'especialidad' => 'nullable|string|max:100',
                'experiencia_anos' => 'nullable|integer|min:0',
                'biografia' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            // 1. Crear Usuario (Rol 3 = Agente)
            $usuarioData = $request->except(['avatar', 'carrera', 'especialidad', 'biografia', 'experiencia_anos', 'nitInmobiliaria']);
            $usuarioData['idRol'] = 3;
            $usuarioData['password'] = $request->password;
            
            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('avatars', 'public');
                $usuarioData['avatar'] = $path;
            }

            $usuario = Usuario::create($usuarioData);

            // 2. Crear Perfil de Agente
            $profileData = $request->only(['carrera', 'especialidad', 'biografia', 'experiencia_anos', 'nitInmobiliaria']);
            $profileData['usuario_id'] = $usuario->docUsuario;
            
            $profile = AgenteProfile::create($profileData);

            DB::commit();
            return response()->json([
                'message' => 'Agente creado exitosamente',
                'usuario' => $usuario,
                'profile' => $profile
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear agente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener un agente específico
     */
    public function show($id)
    {
        try {
            $agente = Usuario::agentes()->with('agenteProfile')->findOrFail($id);
            
            // Mapeo para el frontend
            $profile = $agente->agenteProfile;
            $agente->carrera = $profile->carrera ?? null;
            $agente->especialidad = $profile->especialidad ?? null;
            $agente->biografia = $profile->biografia ?? null;
            $agente->experiencia_anos = $profile->experiencia_anos ?? 0;
            $agente->nitInmobiliaria = $profile->nitInmobiliaria ?? null;
            $agente->ciudad = $agente->ciudad ?? null;
            $agente->activo = (bool) $agente->activo; // De Usuario
            
            $agente->propiedades = rand(5, 20);
            $agente->ventas = rand(3, 15);
            $agente->estado = $agente->activo ? 'Activo' : 'Inactivo';

            return response()->json($agente, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Agente no encontrado',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Actualizar agente
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $usuario = Usuario::agentes()
                ->with('agenteProfile')
                ->findOrFail($id);

            $validator = Validator::make($request->all(), [
                'nombre' => 'sometimes|required|string|max:120',
                'direccion' => 'nullable|string|max:200',
                'telefono' => 'nullable|string|max:30',
                'genero' => 'nullable|string|in:Masculino,Femenino,Otro',
                'password' => 'nullable|string|min:8',
                'ciudad' => 'nullable|string|max:100',
                'activo' => 'sometimes|boolean',

                // SOLO CAMPOS REALES DE agente_profiles
                'nitInmobiliaria' => 'nullable|string|max:20',
                'carrera' => 'nullable|string|max:100',
                'especialidad' => 'nullable|string|max:100',
                'experiencia_anos' => 'nullable|integer|min:0',
                'biografia' => 'nullable|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación',
                    'errors' => $validator->errors()
                ], 422);
            }

            /*
            |----------------------------------------
            | 1️⃣ ACTUALIZAR USUARIO
            |----------------------------------------
            */

            $userData = $request->only([
                'nombre',
                'telefono',
                'direccion',
                'genero',
                'ciudad'
            ]);

            if ($request->has('activo')) {
                $userData['activo'] = (bool) $request->activo;
            }

            if ($request->filled('password')) {
                $userData['password'] = bcrypt($request->password);
            }

            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('avatars', 'public');
                $userData['avatar'] = $path;
            }

            $usuario->update($userData);

            /*
            |----------------------------------------
            | 2️⃣ ACTUALIZAR PERFIL PROFESIONAL
            |----------------------------------------
            */

            $profileData = $request->only([
                'carrera',
                'especialidad',
                'biografia',
                'experiencia_anos',
                'nitInmobiliaria'
            ]);

            $usuario->agenteProfile()->updateOrCreate(
                ['usuario_id' => $usuario->docUsuario],
                $profileData
            );

            DB::commit();

            return response()->json([
                'message' => 'Agente actualizado exitosamente',
                'usuario' => $usuario->load('agenteProfile')
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar agente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar agente
     */
    public function destroy($id)
    {
        try {
            $usuario = Usuario::agentes()->findOrFail($id);
            
            // El perfil se debería borrar por cascada si se configuró en DB,
            // si no, lo borramos manualmente aquí
            if ($usuario->agenteProfile) {
                $usuario->agenteProfile->delete();
            }
            
            $usuario->delete();

            return response()->json([
                'message' => 'Agente eliminado exitosamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar agente',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
