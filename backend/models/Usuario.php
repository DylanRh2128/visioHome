<?php

require_once __DIR__ . '/../../db/conexion.php';

class Usuario
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Conexion::getConexion();
    }

    // ===============================
    // LISTAR TODOS
    // ===============================
    public function obtenerTodos(): array
    {
        $sql = "SELECT 
                    docUsuario,
                    nombre,
                    correo,
                    telefono,
                    direccion,
                    idRol,
                    creado_en,
                    intentosFallidos,
                    bloqueadoHasta
                FROM usuarios";

        return $this->db->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }

    // ===============================
    // CREAR
    // ===============================
    public function crear(array $data): bool
    {
        $sql = "INSERT INTO usuarios (
                    docUsuario, nombre, correo, telefono, direccion, password, idRol
                ) VALUES (
                    :docUsuario, :nombre, :correo, :telefono, :direccion, :password, :idRol
                )";

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            'docUsuario' => $data['docUsuario'],
            'nombre'     => $data['nombre'],
            'correo'     => $data['correo'],
            'telefono'   => $data['telefono'] ?? null,
            'direccion'  => $data['direccion'] ?? null,
            'password'   => password_hash($data['password'], PASSWORD_BCRYPT),
            'idRol'      => $data['idRol']
        ]);
    }

    // ===============================
    // OBTENER POR DOCUMENTO
    // ===============================
    public function obtenerPorDocumento(string $docUsuario): array|false
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM usuarios WHERE docUsuario = :docUsuario"
        );
        $stmt->execute(['docUsuario' => $docUsuario]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // ===============================
    // OBTENER POR CORREO (LOGIN)
    // ===============================
    public function obtenerPorCorreo(string $correo): array|false
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM usuarios WHERE correo = :correo"
        );
        $stmt->execute(['correo' => $correo]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // ===============================
    // ACTUALIZAR
    // ===============================
    public function actualizar(array $data): bool
    {
        $sql = "UPDATE usuarios SET
                    nombre = :nombre,
                    correo = :correo,
                    telefono = :telefono,
                    direccion = :direccion,
                    idRol = :idRol,
                    actualizado_en = NOW()
                WHERE docUsuario = :docUsuario";

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            'nombre'     => $data['nombre'],
            'correo'     => $data['correo'],
            'telefono'   => $data['telefono'],
            'direccion'  => $data['direccion'],
            'idRol'      => $data['idRol'],
            'docUsuario' => $data['docUsuario']
        ]);
    }

    // ===============================
    // ELIMINAR
    // ===============================
    public function eliminar(string $docUsuario): bool
    {
        $stmt = $this->db->prepare(
            "DELETE FROM usuarios WHERE docUsuario = :docUsuario"
        );

        return $stmt->execute(['docUsuario' => $docUsuario]);
    }

    // ===============================
    // LOGIN – SEGURIDAD
    // ===============================
    public function incrementarIntentos(string $correo): void
    {
        $this->db->prepare(
            "UPDATE usuarios SET intentosFallidos = intentosFallidos + 1 WHERE correo = :correo"
        )->execute(['correo' => $correo]);
    }

    public function bloquear(string $correo, string $fecha): void
    {
        $this->db->prepare(
            "UPDATE usuarios SET bloqueadoHasta = :fecha WHERE correo = :correo"
        )->execute([
            'fecha'  => $fecha,
            'correo' => $correo
        ]);
    }

    public function resetIntentos(string $correo): void
    {
        $this->db->prepare(
            "UPDATE usuarios SET intentosFallidos = 0, bloqueadoHasta = NULL WHERE correo = :correo"
        )->execute(['correo' => $correo]);
    }
}
