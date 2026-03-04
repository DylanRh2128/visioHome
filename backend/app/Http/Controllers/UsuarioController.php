<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\AgenteProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    /**
     * Listar todos los usuarios
     */
    public function index(Request $request)
    {
        try {
            $query = Usuario::with('agenteProfile');

            // Filtro por rol
            if ($request->has('idRol')) {
                $query->where('idRol', $request->idRol);
            }

            // Filtro por búsqueda
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('nombre', 'like', "%{$search}%")
                      ->orWhere('correo', 'like', "%{$search}%")
                      ->orWhere('docUsuario', 'like', "%{$search}%");
                });
            }

            $usuarios = $query->orderBy('creado_en', 'desc')->get();

            // Agregar metadatos
            $usuarios->map(function($usuario) {
                $roles = [1 => 'Admin', 2 => 'Cliente', 3 => 'Agente'];
                $usuario->nombreRol = $roles[$usuario->idRol] ?? 'Desconocido';
                $usuario->estado = $usuario->activo ? 'Activo' : 'Inactivo';
                
                // Si es agente, aplanar perfil para compatibilidad frontend
                if ($usuario->idRol == 3 && $usuario->agenteProfile) {
                    $p = $usuario->agenteProfile;
                    $usuario->carrera = $p->carrera;
                    $usuario->especialidad = $p->especialidad;
                    $usuario->biografia = $p->biografia;
                    $usuario->experiencia_anos = $p->experiencia_anos;
                    $usuario->nitInmobiliaria = $p->nitInmobiliaria;
                }
                
                return $usuario;
            });

            return response()->json($usuarios, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener usuarios',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Crear nuevo usuario
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($request->all(), [
                'docUsuario' => 'required|string|max:20|unique:usuarios,docUsuario',
                'nombre' => 'required|string|max:120',
                'correo' => 'required|email|max:180|unique:usuarios,correo',
                'password' => 'required|string|min:6',
                'idRol' => 'required|integer|in:1,2,3',
                'ciudad' => 'nullable|string|max:100',
                'activo' => 'sometimes|boolean'
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422);
            }

            $usuarioData = $request->except(['avatar']);
            $usuarioData['password'] = $request->password; // Ensure it's passed for model hashing if applicable
            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('avatars', 'public');
                $usuarioData['avatar'] = $path;
            }

            $usuario = Usuario::create($usuarioData);

            // Si es Agente, crear perfil
            if ($usuario->idRol == 3) {
                AgenteProfile::create([
                    'usuario_id' => $usuario->docUsuario
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Usuario creado exitosamente',
                'usuario' => $usuario->load('agenteProfile')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al crear usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener un usuario específico
     */
    public function show($id)
    {
        try {
            $usuario = Usuario::with('agenteProfile')->findOrFail($id);
            
            $roles = [1 => 'Admin', 2 => 'Cliente', 3 => 'Agente'];
            $usuario->nombreRol = $roles[$usuario->idRol] ?? 'Desconocido';
            $usuario->estado = $usuario->activo ? 'Activo' : 'Inactivo';

            return response()->json($usuario, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Usuario no encontrado',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Actualizar usuario
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $usuario = Usuario::findOrFail($id);
            $oldRol = $usuario->idRol;

            $validator = Validator::make($request->all(), [
                'nombre' => 'sometimes|required|string|max:120',
                'password' => 'nullable|string|min:6',
                'idRol' => 'sometimes|required|integer|in:1,2,3',
                'ciudad' => 'nullable|string|max:100',
                'activo' => 'sometimes|boolean'
            ]);

            if ($validator->fails()) {
                return response()->json(['message' => 'Error de validación', 'errors' => $validator->errors()], 422);
            }

            $data = $request->except(['docUsuario', 'correo', 'avatar', 'activo']);
            if ($request->has('activo')) {
                $data['activo'] = (bool) $request->activo;
            }

            if (empty($data['password'])) {
                unset($data['password']);
            }
            
            if ($request->hasFile('avatar')) {
                $path = $request->file('avatar')->store('avatars', 'public');
                $data['avatar'] = $path;
            }

            $usuario->update($data);

            // Manejo dinámico de perfil
            if ($usuario->idRol == 3 && $oldRol != 3) {
                // Convertido a Agente
                AgenteProfile::firstOrCreate(['usuario_id' => $usuario->docUsuario]);
            } elseif ($usuario->idRol != 3 && $oldRol == 3) {
                // Ya no es Agente, eliminar perfil (opcional)
                if ($usuario->agenteProfile) {
                    $usuario->agenteProfile->delete();
                }
            }

            // Si es agente y vienen datos de perfil, actualizarlos
            if ($usuario->idRol == 3) {
                $profileFields = $request->only(['carrera', 'especialidad', 'biografia', 'experiencia_anos', 'nitInmobiliaria']);
                if (!empty($profileFields) && $usuario->agenteProfile) {
                    $usuario->agenteProfile->update($profileFields);
                }
            }

            DB::commit();
            return response()->json([
                'message' => 'Usuario actualizado exitosamente',
                'usuario' => $usuario->load('agenteProfile')
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Error al actualizar usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Eliminar usuario
     */
    public function destroy($id)
    {
        try {
            $usuario = Usuario::findOrFail($id);
            
            if ($usuario->agenteProfile) {
                $usuario->agenteProfile->delete();
            }
            
            $usuario->delete();

            return response()->json(['message' => 'Usuario eliminado exitosamente'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar usuario',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Obtener estadísticas globales de usuarios
     */
    public function globalStats()
    {
        try {
            return response()->json([
                'total_usuarios' => Usuario::count(),
                'total_clientes' => Usuario::where('idRol', 2)->count(),
                'total_agentes' => Usuario::where('idRol', 3)->count(),
                'total_admins' => Usuario::where('idRol', 1)->count(),
                'total_activos' => Usuario::where('activo', 1)->count(),
                'total_bloqueados' => Usuario::whereNotNull('bloqueadoHasta')
                    ->orWhere('activo', 0)
                    ->count()
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener estadísticas', 'error' => $e->getMessage()], 500);
        }
    }
}
