<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Propiedad;
use App\Models\Favorite;
use Illuminate\Http\Request;

class UserDashboardController extends Controller
{
    public function getDashboardData(Request $request)
    {
        $user = $request->user();

        // Citas próximas (si existe la tabla)
        $appointments = collect();
        try {
            $appointments = \App\Models\Cita::where('docUsuario', $user->docUsuario)
                ->where('fecha', '>=', now())
                ->orderBy('fecha', 'asc')
                ->limit(3)
                ->get();
        } catch (\Exception $e) {
            // La tabla citas puede no existir aún
        }

        // Favoritos del usuario
        $favoritesCount = 0;
        try {
            $favoritesCount = Favorite::where('docUsuario', $user->docUsuario)->count();
        } catch (\Exception $e) {}

        // Total de propiedades disponibles
        $availableCount = Propiedad::where('estado', 'disponible')->count();

        // Propiedades destacadas (últimas 4 disponibles)
        $featuredProperties = Propiedad::where('estado', 'disponible')
            ->orderBy('idPropiedad', 'desc')
            ->limit(4)
            ->get();

        $featuredProperties->transform(function ($p) {
            if ($p->imagen_principal) {
                $p->imagen_principal = url('storage/' . $p->imagen_principal);
            } elseif ($p->imagen) {
                $p->imagen_url = url('storage/' . $p->imagen);
            }
            return $p;
        });

        return response()->json([
            'user'                  => $user,
            'stats'                 => [
                'available_count'     => $availableCount,
                'appointments_count'  => $appointments->count(),
                'favorites_count'     => $favoritesCount,
                'cart_count'          => 0, // Carrito eliminado
            ],
            'upcoming_appointments' => $appointments,
            'featured_properties'   => $featuredProperties,
        ]);
    }
}
