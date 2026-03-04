<?php

namespace App\Http\Controllers;

use App\Models\PropiedadImagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Modelo3DController extends Controller
{
    /**
     * GET /api/propiedades/{id}/modelo3d
     *
     * Returns the 3D model URL for a given property,
     * or null if no model exists.
     */
    public function show($id)
    {
        $registro = PropiedadImagen::where('idPropiedad', $id)
            ->where('tipo', 'modelo3d')
            ->orderBy('orden')
            ->first();

        if (!$registro) {
            return response()->json(['model_url' => null]);
        }

        // If the stored URL is already absolute (http/https), return as-is.
        // Otherwise build the full storage URL.
        $url = $registro->urlImagen;

        if (!str_starts_with($url, 'http')) {
            // Strip leading slash if present, then build asset URL
            $url = asset(ltrim($url, '/'));
        }

        return response()->json(['model_url' => $url]);
    }
}
