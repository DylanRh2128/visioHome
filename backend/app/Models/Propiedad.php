<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propiedad extends Model
{
    protected $table = 'propiedades';

    protected $primaryKey = 'idPropiedad';

    const CREATED_AT = 'creado_en';
    const UPDATED_AT = 'actualizado_en';

    protected $fillable = [
        'titulo',
        'descripcion',
        'ubicacion',
        'tamano_m2',
        'precio',
        'estado',
        'tipo',
        'nitInmobiliaria'
    ];
}
