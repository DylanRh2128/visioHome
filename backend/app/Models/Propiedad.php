<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Propiedad extends Model
{
    protected $table = 'propiedades';
    protected $primaryKey = 'idPropiedad';
    public $timestamps = false;

    protected $fillable = [
        'titulo',
        'descripcion',
        'ubicacion',
        'ciudad',
        'tamano_m2',
        'precio',
        'estado',
        'tipo',
        'nitInmobiliaria',
        'imagen',
        'categoria_ciudad',
        'creado_en',
        'actualizado_en',
    ];

    public function agentesEnCiudad()
    {
        return Usuario::agentes()->whereHas('agenteProfile', function($q) {
            $q->where('ciudad', $this->ciudad)->where('activo', 1);
        })->get();
    }

    // Relación: una propiedad tiene muchos pagos
    public function pagos()
    {
        return $this->hasMany(Pago::class, 'idPropiedad', 'idPropiedad');
    }

    // Relación: una propiedad tiene muchas imágenes
    public function imagenes()
    {
        return $this->hasMany(PropiedadImagen::class, 'idPropiedad', 'idPropiedad');
    }

    // Relación: una propiedad tiene muchos favoritos
    public function favoritos()
    {
        return $this->hasMany(Favorite::class, 'idPropiedad', 'idPropiedad');
    }

    // Relación: una propiedad tiene muchos comentarios
    public function comentarios()
    {
        return $this->hasMany(Comment::class, 'idPropiedad', 'idPropiedad');
    }

    // Relación: una propiedad tiene muchas citas
    public function citas()
    {
        return $this->hasMany(Cita::class, 'idPropiedad', 'idPropiedad');
    }
}
