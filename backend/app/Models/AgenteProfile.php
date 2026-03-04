<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AgenteProfile extends Model
{
    protected $table = 'agente_profiles';
    protected $primary_key = 'id';

    protected $fillable = [
        'usuario_id',
        'carrera',
        'especialidad',
        'biografia',
        'experiencia_anos',
        'nitInmobiliaria',
        'promedio_valoracion'
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'docUsuario');
    }
}
