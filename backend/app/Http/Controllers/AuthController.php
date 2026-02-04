<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'correo' => 'required|email',
            'password' => 'required'
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json([
                'message' => 'Credenciales inválidas'
            ], 401);
        }

        return response()->json([
            'message' => 'Login exitoso',
            'usuario' => $usuario
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'docUsuario' => 'required|unique:usuarios',
            'nombre' => 'required',
            'correo' => 'required|email|unique:usuarios',
            'password' => 'required|min:6',
            'idRol' => 'required'
        ]);

        $usuario = Usuario::create([
            'docUsuario' => $request->docUsuario,
            'nombre' => $request->nombre,
            'correo' => $request->correo,
            'password' => Hash::make($request->password),
            'idRol' => $request->idRol,
        ]);

        return response()->json([
            'message' => 'Usuario registrado',
            'usuario' => $usuario
        ], 201);
    }
}
