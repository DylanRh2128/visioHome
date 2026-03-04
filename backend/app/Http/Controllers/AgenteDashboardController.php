<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AgenteDashboardController extends Controller
{
    /**
     * Obtener estadísticas para el dashboard del agente.
     */
    public function getStats(Request $request)
    {
        $user = $request->user();

        if (!$user || $user->idRol != 3) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $docAgente = $user->docUsuario;
        
        try {
            $now = Carbon::now();
            $today = $now->toDateString();

            // 1. Citas Totales
            $totalCitas = Cita::where('docAgente', $docAgente)->count();

            // 2. Citas de hoy
            $citasHoy = Cita::where('docAgente', $docAgente)
                ->whereDate('fecha', $today)
                ->where('estado', '!=', 'cancelada')
                ->count();

            // 3. Citas Pendientes (no completadas ni canceladas)
            $citasPendientes = Cita::where('docAgente', $docAgente)
                ->where('estado', 'pendiente')
                ->count();

            // 4. Próximas citas (listado corto)
            $proximasCitas = Cita::where('docAgente', $docAgente)
                ->where('estado', '!=', 'cancelada')
                ->where('fecha', '>=', $now)
                ->with(['propiedad', 'usuario'])
                ->orderBy('fecha', 'asc')
                ->take(5)
                ->get();

            return response()->json([
                'stats' => [
                    'total_citas'      => $totalCitas,
                    'citas_hoy'        => $citasHoy,
                    'citas_pendientes' => $citasPendientes,
                    'ventas_mes'       => 0, 
                ],
                'proximas_citas' => $proximasCitas
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al cargar estadísticas del dashboard',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
