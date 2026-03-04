<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'usuarios';

    protected $primaryKey = 'docUsuario';
    public $incrementing = false;
    protected $keyType = 'string';

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
        'genero',
        'avatar',
        'ciudad',
        'activo',
        'login_count',
        'intentosFallidos',
        'bloqueadoHasta'
    ];

    protected $hidden = [
        'password'
    ];

    public function agenteProfile()
    {
        return $this->hasOne(AgenteProfile::class, 'usuario_id', 'docUsuario');
    }

    public function scopeAdmins($query)
    {
        return $query->where('idRol', 1);
    }

    public function scopeClientes($query)
    {
        return $query->where('idRol', 2);
    }

    public function scopeAgentes($query)
    {
        return $query->where('idRol', 3);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
