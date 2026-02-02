<?php
require_once __DIR__ . '/../../db/conexion.php';

class Propiedad {
    private PDO $db;

    public function __construct() {
        $this->db = Conexion::getConexion();
    }

    public function obtenerTodos(): array {
        $sql = "SELECT p.*, i.nombre AS inmobiliaria
                FROM propiedades p
                JOIN inmobiliarias i ON p.nitInmobiliaria = i.nitInmobiliaria";
        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crear(array $d): bool {
        $sql = "INSERT INTO propiedades
                (titulo, descripcion, ubicacion, tamano_m2, precio, estado, tipo, nitInmobiliaria)
                VALUES (:t, :d, :u, :m2, :p, :e, :tipo, :nit)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':t'=>$d['titulo'],
            ':d'=>$d['descripcion'],
            ':u'=>$d['ubicacion'],
            ':m2'=>$d['tamano_m2'],
            ':p'=>$d['precio'],
            ':e'=>$d['estado'],
            ':tipo'=>$d['tipo'],
            ':nit'=>$d['nitInmobiliaria']
        ]);
    }

    public function obtener(int $id): array|false {
        $stmt = $this->db->prepare("SELECT * FROM propiedades WHERE idPropiedad=:id");
        $stmt->execute([':id'=>$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function actualizar(array $d): bool {
        $sql = "UPDATE propiedades SET
                titulo=:t, descripcion=:d, ubicacion=:u,
                tamano_m2=:m2, precio=:p, estado=:e,
                tipo=:tipo, nitInmobiliaria=:nit,
                actualizado_en=NOW()
                WHERE idPropiedad=:id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':t'=>$d['titulo'],
            ':d'=>$d['descripcion'],
            ':u'=>$d['ubicacion'],
            ':m2'=>$d['tamano_m2'],
            ':p'=>$d['precio'],
            ':e'=>$d['estado'],
            ':tipo'=>$d['tipo'],
            ':nit'=>$d['nitInmobiliaria'],
            ':id'=>$d['idPropiedad']
        ]);
    }

    public function eliminar(int $id): bool {
        $stmt = $this->db->prepare("DELETE FROM propiedades WHERE idPropiedad=:id");
        return $stmt->execute([':id'=>$id]);
    }
}
