<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    // ===============================
    // LISTAR TODOS
    // ===============================
    public function index()
    {
        return response()->json(
            Usuario::all()
        );
    }

    // ===============================
    // CREAR
    // ===============================
    public function store(Request $request)
    {
        $usuario = Usuario::create($request->all());

        return response()->json($usuario, 201);
    }

    // ===============================
    // OBTENER POR DOCUMENTO
    // ===============================
    public function show($docUsuario)
    {
        return response()->json(
            Usuario::findOrFail($docUsuario)
        );
    }

    // ===============================
    // ACTUALIZAR
    // ===============================
    public function update(Request $request, $docUsuario)
    {
        $usuario = Usuario::findOrFail($docUsuario);
        $usuario->update($request->all());

        return response()->json($usuario);
    }

    // ===============================
    // ELIMINAR
    // ===============================
    public function destroy($docUsuario)
    {
        Usuario::destroy($docUsuario);

        return response()->json(null, 204);
    }
}
