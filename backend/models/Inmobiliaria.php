<?php
require_once __DIR__ . '/../../db/conexion.php';

class Inmobiliaria {
    private PDO $db;

    public function __construct() {
        $this->db = Conexion::getConexion();
    }

    public function obtenerTodos(): array {
        return $this->db->query("SELECT * FROM inmobiliarias")
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crear(array $data): bool {
        $sql = "INSERT INTO inmobiliarias
                (nitInmobiliaria, nombre, correo, telefono, direccion, objetivo)
                VALUES (:nit, :nombre, :correo, :tel, :dir, :obj)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':nit' => $data['nitInmobiliaria'],
            ':nombre' => $data['nombre'],
            ':correo' => $data['correo'],
            ':tel' => $data['telefono'],
            ':dir' => $data['direccion'],
            ':obj' => $data['objetivo']
        ]);
    }

    public function obtener(string $nit): array|false {
        $stmt = $this->db->prepare("SELECT * FROM inmobiliarias WHERE nitInmobiliaria=:nit");
        $stmt->execute([':nit' => $nit]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function actualizar(array $data): bool {
        $sql = "UPDATE inmobiliarias SET
                nombre=:nombre,
                correo=:correo,
                telefono=:tel,
                direccion=:dir,
                objetivo=:obj
                WHERE nitInmobiliaria=:nit";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':nombre' => $data['nombre'],
            ':correo' => $data['correo'],
            ':tel' => $data['telefono'],
            ':dir' => $data['direccion'],
            ':obj' => $data['objetivo'],
            ':nit' => $data['nitInmobiliaria']
        ]);
    }

    public function eliminar(string $nit): bool {
        $stmt = $this->db->prepare("DELETE FROM inmobiliarias WHERE nitInmobiliaria=:nit");
        return $stmt->execute([':nit' => $nit]);
    }
}
