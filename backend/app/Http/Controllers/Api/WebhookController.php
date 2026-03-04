<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cita;
use App\Models\Pago;
use App\Models\Disponibilidad; // No se usa aquí pero podría
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    /**
     * Recibir notificaciones de MercadoPago.
     */
    public function handleMercadoPago(Request $request)
    {
        Log::info('Webhook MercadoPago recibido', $request->all());

        if ($request->type === 'payment') {
            $paymentId = $request->data['id'];
            
            // Consultar el estado del pago a MercadoPago
            \MercadoPago\SDK::setAccessToken(env('MP_ACCESS_TOKEN'));
            $payment = \MercadoPago\Payment::find_by_id($paymentId);

            if ($payment && $payment->status === 'approved') {
                $idCita = $payment->external_reference;
                
                $cita = Cita::find($idCita);
                if ($cita) {
                    // 1. Confirmar Cita (Operativo)
                    $cita->update(['estado' => 'confirmada']);

                    // 2. Actualizar/Confirmar Pago (Financiero)
                    Pago::updateOrCreate(
                        ['idCita' => $cita->idCita], // Buscamos por el ID de la cita que creamos preventivamente
                        [
                            'monto' => $payment->transaction_amount,
                            'metodoPago' => $payment->payment_type_id,
                            'estado' => 'aprobado',
                            'referencia' => $payment->id,
                            'external_reference' => $payment->id,
                            'mp_preference_id' => $payment->order->id ?? null,
                            'fecha' => now()
                        ]
                    );

                    Log::info("Cita #{$idCita} confirmada por pago aprobado.");
                }
            } elseif ($payment && ($payment->status === 'rejected' || $payment->status === 'cancelled')) {
                $idCita = $payment->external_reference;
                $cita = Cita::find($idCita);
                if ($cita) {
                    $cita->update(['estado' => 'cancelada']);
                    Pago::updateOrCreate(
                        ['idCita' => $cita->idCita],
                        ['estado' => 'rechazado']
                    );
                }
            }
        }

        return response()->json(['status' => 'ok']);
    }
}
