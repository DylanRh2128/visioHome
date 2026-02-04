<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $table = 'pagos';

    protected $primaryKey = 'idPago';

    public $timestamps = false;

    protected $fillable = [
        'docUsuario',
        'idPropiedad',
        'idCita',
        'monto',
        'metodoPago',
        'estado',
        'referencia'
    ];
}
