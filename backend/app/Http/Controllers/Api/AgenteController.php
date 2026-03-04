<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\AgenteProfile;
use App\Models\ValoracionAgente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class AgenteController extends Controller
{
    /**
     * Get agents, optionally filtered by city.
     */
    public function index(Request $request)
    {
        $query = Usuario::agentes()->where('activo', 1);

        if ($request->filled('ciudad')) {
            $query->where('ciudad', 'LIKE', '%' . $request->ciudad . '%');
        }

        $agentes = $query->with('agenteProfile')->get();
        
        // Transformar para respuesta consistente
        $agentes->map(function($a) {
            $a->especialidad = $a->agenteProfile->especialidad ?? null;
            $a->ciudad = $a->ciudad ?? null;
            $a->promedio_valoracion = $a->agenteProfile->promedio_valoracion ?? 0;
            return $a;
        });

        return response()->json($agentes);
    }

    /**
     * Get details of a specific agent including ratings.
     */
    public function show($id)
    {
        $agente = Usuario::agentes()
            ->with(['agenteProfile', 'valoraciones.usuario'])
            ->where('docUsuario', $id)
            ->first();

        if (!$agente) {
            return response()->json(['message' => 'Agente no encontrado'], 404);
        }

        // Mapear campos de perfil a nivel superior para compatibilidad
        $agente->especialidad = $agente->agenteProfile->especialidad ?? null;
        $agente->promedio_valoracion = $agente->agenteProfile->promedio_valoracion ?? 0;

        return response()->json($agente);
    }

    /**
     * Rate an agent.
     */
    public function rate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'docAgente' => 'required|exists:usuarios,docUsuario',
            'puntuacion' => 'required|integer|min:1|max:5',
            'comentario' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = $request->user();

        // Check if user already rated this agent
        $existing = ValoracionAgente::where('docAgente', $request->docAgente)
            ->where('docUsuario', $user->docUsuario)
            ->first();

        if ($existing) {
            $existing->update([
                'puntuacion' => $request->puntuacion,
                'comentario' => $request->comentario
            ]);
        } else {
            ValoracionAgente::create([
                'docAgente' => $request->docAgente,
                'docUsuario' => $user->docUsuario,
                'puntuacion' => $request->puntuacion,
                'comentario' => $request->comentario
            ]);
        }

        // Update average rating on AgenteProfile table
        $average = ValoracionAgente::where('docAgente', $request->docAgente)
            ->avg('puntuacion');

        AgenteProfile::where('usuario_id', $request->docAgente)
            ->update(['promedio_valoracion' => $average]);

        return response()->json([
            'message' => 'Valoración registrada con éxito',
            'promedio' => round($average, 2)
        ]);
    }
}
