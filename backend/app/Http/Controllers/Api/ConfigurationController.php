<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\Request;

class ConfigurationController extends Controller
{
    /**
     * Listar todas las configuraciones.
     */
    public function index()
    {
        return response()->json(Configuration::all());
    }

    public function getStatus()
    {
        return response()->json([
            'payments_enabled' => (bool) env('APP_ENABLE_PAYMENTS', true),
            'cita_precio_base' => Configuration::getValue('cita_precio_base', 50000)
        ]);
    }

    /**
     * Actualizar una configuración específica.
     */
    public function update(Request $request, $key)
    {
        $request->validate([
            'value' => 'required'
        ]);

        $config = Configuration::updateOrCreate(
            ['key' => $key],
            ['value' => $request->value]
        );

        return response()->json([
            'message' => 'Configuración actualizada',
            'config' => $config
        ]);
    }
}
