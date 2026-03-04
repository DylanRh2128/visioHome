<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Propiedad;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = Propiedad::query()->where('estado', 'disponible');

        // 🔎 Búsqueda general (Título, descripción, ubicación)
        if ($request->filled('search')) {
            $s = $request->input('search');
            $query->where(function($sub) use ($s) {
                $sub->where('titulo', 'like', "%{$s}%")
                    ->orWhere('descripcion', 'like', "%{$s}%")
                    ->orWhere('ubicacion', 'like', "%{$s}%")
                    ->orWhere('ciudad', 'like', "%{$s}%");
            });
        }

        // 💰 Filtro por precio mínimo
        if ($request->filled('precio_min')) {
            $query->where('precio', '>=', $request->input('precio_min'));
        }

        // 💰 Filtro por precio máximo
        if ($request->filled('precio_max')) {
            $query->where('precio', '<=', $request->input('precio_max'));
        }

        // 🏠 Filtro por tipo de propiedad
        if ($request->filled('type')) {
            $query->where('tipo', $request->input('type'));
        }

        // 🛏 Filtro por habitaciones (mínimo)
        if ($request->filled('habitaciones')) {
            $query->where('habitaciones', '>=', $request->input('habitaciones'));
        }

        // 🌆 Filtro por ciudad
        if ($request->filled('ciudad')) {
            $query->where('ciudad', $request->input('ciudad'));
        }

        // Ordenamiento (opcional)
        $orderBy = $request->input('order_by', 'creado_en');
        $orderDir = $request->input('order_dir', 'desc');
        $query->orderBy($orderBy, $orderDir);

        $results = $query->paginate(12);

        $results->getCollection()->transform(function ($p) {
            if ($p->imagen && !filter_var($p->imagen, FILTER_VALIDATE_URL)) {
                $p->imagen = url('storage/' . $p->imagen);
            }
            $p->imagen_principal = $p->imagen;
            return $p;
        });

        return response()->json($results);
    }
}
