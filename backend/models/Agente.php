<?php
require_once __DIR__ . '/../../db/conexion.php';

class Agente {
    private PDO $db;

    public function __construct() {
        $this->db = Conexion::getConexion();
    }

    public function obtenerTodos(): array {
        $sql = "SELECT a.*, i.nombre AS inmobiliaria
                FROM agentes a
                LEFT JOIN inmobiliarias i ON a.nitInmobiliaria = i.nitInmobiliaria";
        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    public function crear(array $data): bool {
        $sql = "INSERT INTO agentes
                (docAgente, nombre, direccion, correo, telefono, nitInmobiliaria)
                VALUES (:doc, :nombre, :dir, :correo, :tel, :nit)";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':doc' => $data['docAgente'],
            ':nombre' => $data['nombre'],
            ':dir' => $data['direccion'] ?? null,
            ':correo' => $data['correo'],
            ':tel' => $data['telefono'] ?? null,
            ':nit' => $data['nitInmobiliaria'] ?? null
        ]);
    }

    public function obtener(string $doc): array|false {
        $stmt = $this->db->prepare("SELECT * FROM agentes WHERE docAgente = :doc");
        $stmt->execute([':doc' => $doc]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function actualizar(array $data): bool {
        $sql = "UPDATE agentes SET
                nombre=:nombre,
                direccion=:dir,
                correo=:correo,
                telefono=:tel,
                nitInmobiliaria=:nit
                WHERE docAgente=:doc";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute([
            ':nombre' => $data['nombre'],
            ':dir' => $data['direccion'],
            ':correo' => $data['correo'],
            ':tel' => $data['telefono'],
            ':nit' => $data['nitInmobiliaria'],
            ':doc' => $data['docAgente']
        ]);
    }

    public function desactivar(string $doc): bool {
        $stmt = $this->db->prepare("UPDATE agentes SET activo=0 WHERE docAgente=:doc");
        return $stmt->execute([':doc' => $doc]);
    }
}
