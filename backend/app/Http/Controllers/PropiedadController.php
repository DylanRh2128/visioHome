<?php

namespace App\Http\Controllers;

use App\Models\Propiedad;
use Illuminate\Http\Request;

class PropiedadController extends Controller
{
    public function index()
    {
        return response()->json(Propiedad::all());
    }

    public function store(Request $request)
    {
        $propiedad = Propiedad::create($request->all());
        return response()->json($propiedad, 201);
    }

    public function show($idPropiedad)
    {
        return response()->json(
            Propiedad::findOrFail($idPropiedad)
        );
    }

    public function update(Request $request, $idPropiedad)
    {
        $propiedad = Propiedad::findOrFail($idPropiedad);
        $propiedad->update($request->all());

        return response()->json($propiedad);
    }

    public function destroy($idPropiedad)
    {
        Propiedad::destroy($idPropiedad);
        return response()->json(null, 204);
    }
}
