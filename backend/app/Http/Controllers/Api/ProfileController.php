<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Obtener el perfil del usuario autenticado
     */
    public function show(Request $request)
    {
        $user = $request->user();
        
        if ($user->idRol == 3) {
            $user->load('agenteProfile');
        }

        $roles = [1 => 'Admin', 2 => 'Cliente', 3 => 'Agente'];
        $user->nombreRol = $roles[$user->idRol] ?? 'Usuario';

        // Construir URL pública del avatar
        if ($user->avatar) {
            $user->avatar_url = url('storage/' . $user->avatar);
        }

        return response()->json($user);
    }

    /**
     * Actualizar datos del perfil (nombre, teléfono, dirección, contraseña)
     * El correo NO se puede modificar.
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'nombre'    => 'sometimes|required|string|max:120',
            'telefono'  => 'nullable|string|max:30',
            'direccion' => 'nullable|string|max:255',
            'password'  => 'nullable|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors'  => $validator->errors()
            ], 422);
        }

        $data = $request->only(['nombre', 'telefono', 'direccion']);

        // Solo actualizar contraseña si se envió y no está vacía
        if ($request->filled('password')) {
            $data['password'] = $request->password; // El mutator del modelo hace el Hash
        }

        $user->update($data);

        $roles = [1 => 'Admin', 2 => 'Cliente', 3 => 'Agente'];
        $user->nombreRol = $roles[$user->idRol] ?? 'Usuario';

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user'    => $user
        ]);
    }

    /**
     * Subir o reemplazar el avatar del usuario.
     * Recibe multipart/form-data con campo 'avatar'.
     */
    public function uploadAvatar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:3072',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Archivo inválido',
                'errors'  => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        // Eliminar avatar anterior si existe
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Guardar nuevo avatar en storage/app/public/avatars/
        $path = $request->file('avatar')->store('avatars', 'public');

        $user->avatar = $path;
        $user->save();

        return response()->json([
            'message'    => 'Avatar actualizado correctamente',
            'avatar'     => $path,
            'avatar_url' => url('storage/' . $path),
        ]);
    }
}
