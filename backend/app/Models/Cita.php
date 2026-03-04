<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $table = 'citas';

    protected $primaryKey = 'idCita';

    // Solo existe creado_en en la tabla
    const CREATED_AT = 'creado_en';

    // No existe updated_at
    public $timestamps = false;

    protected $fillable = [
        'idPropiedad',
        'docUsuario',
        'docAgente',
        'idDisponibilidad',
        'fecha',
        'estado',
        'canal',
        'precio',
        'notas'
    ];

    // ─── Relaciones ────────────────────────────────────────────────────

    public function propiedad()
    {
        return $this->belongsTo(Propiedad::class, 'idPropiedad', 'idPropiedad');
    }

    public function agente()
    {
        return $this->belongsTo(Usuario::class, 'docAgente', 'docUsuario');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'docUsuario', 'docUsuario');
    }
}