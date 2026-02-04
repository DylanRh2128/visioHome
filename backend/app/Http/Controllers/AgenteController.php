<?php

namespace App\Http\Controllers;

use App\Models\Agente;
use Illuminate\Http\Request;

class AgenteController extends Controller
{
    public function index()
    {
        return response()->json(Agente::all());
    }

    public function store(Request $request)
    {
        $agente = Agente::create($request->all());
        return response()->json($agente, 201);
    }

    public function show($docAgente)
    {
        return response()->json(
            Agente::findOrFail($docAgente)
        );
    }

    public function update(Request $request, $docAgente)
    {
        $agente = Agente::findOrFail($docAgente);
        $agente->update($request->all());

        return response()->json($agente);
    }

    public function destroy($docAgente)
    {
        Agente::destroy($docAgente);
        return response()->json(null, 204);
    }
}
