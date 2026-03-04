<?php

namespace App\Services;

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use App\Models\Pago;

class MercadoPagoService
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken(
            config('services.mercadopago.access_token')
        );
    }

    public function createPreference(Pago $pago)
    {
        $frontend = env('FRONTEND_URL');
        $backend = env('APP_URL');

        $client = new PreferenceClient();

        $preference = $client->create([
            "items" => [
                [
                    "title" => "Reserva VisioHome",
                    "quantity" => 1,
                    "unit_price" => (float) $pago->monto,
                    "currency_id" => "COP"
                ]
            ],

            "external_reference" => (string) $pago->idPago,

            "back_urls" => [
                "success" => "$frontend/payment/success",
                "failure" => "$frontend/payment/failure",
                "pending" => "$frontend/payment/pending"
            ],

            "notification_url" => "$backend/api/webhooks/mercadopago",

            "auto_return" => "approved"
        ]);

        return $preference;
    }
}