<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Usuario extends Model
{
    protected $table = 'usuarios';

    // PK no estándar
    protected $primaryKey = 'docUsuario';
    public $incrementing = false;
    protected $keyType = 'string';

    // Tus columnas de tiempo personalizadas
    const CREATED_AT = 'creado_en';
    const UPDATED_AT = 'actualizado_en';

    protected $fillable = [
        'docUsuario',
        'nombre',
        'correo',
        'telefono',
        'direccion',
        'password',
        'idRol',
        'intentosFallidos',
        'bloqueadoHasta'
    ];

    protected $hidden = [
        'password'
    ];

    // ===============================
    // MUTATORS (reemplaza password_hash)
    // ===============================
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
