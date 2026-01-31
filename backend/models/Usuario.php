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
    // LISTAR TODOS LOS USUARIOS
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

        return $this->db
            ->query($sql)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    // ===============================
    // CREAR USUARIO
    // ===============================
    public function crear(array $data): bool
    {
        $sql = "INSERT INTO usuarios (
                    docUsuario,
                    nombre,
                    correo,
                    telefono,
                    direccion,
                    password,
                    idRol
                ) VALUES (
                    :docUsuario,
                    :nombre,
                    :correo,
                    :telefono,
                    :direccion,
                    :password,
                    :idRol
                )";

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            ':docUsuario' => $data['docUsuario'],
            ':nombre'    => $data['nombre'],
            ':correo'    => $data['correo'],
            ':telefono'  => $data['telefono'] ?? null,
            ':direccion' => $data['direccion'] ?? null,
            ':password'  => password_hash($data['password'], PASSWORD_BCRYPT),
            ':idRol'     => $data['idRol']
        ]);
    }

    // ===============================
    // OBTENER USUARIO POR DOCUMENTO
    // ===============================
    public function obtenerPorDocumento(string $docUsuario): array|false
    {
        $sql = "SELECT * FROM usuarios WHERE docUsuario = :docUsuario";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':docUsuario' => $docUsuario
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // ===============================
    // ACTUALIZAR USUARIO
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
            ':nombre'     => $data['nombre'],
            ':correo'     => $data['correo'],
            ':telefono'   => $data['telefono'],
            ':direccion'  => $data['direccion'],
            ':idRol'      => $data['idRol'],
            ':docUsuario' => $data['docUsuario']
        ]);
    }

    // ===============================
    // ELIMINAR USUARIO
    // ===============================
    public function eliminar(string $docUsuario): bool
    {
        $sql = "DELETE FROM usuarios WHERE docUsuario = :docUsuario";

        $stmt = $this->db->prepare($sql);

        return $stmt->execute([
            ':docUsuario' => $docUsuario
        ]);
    }

    // ===============================
    // LOGIN (VALIDACIÓN)
    // ===============================
    public function obtenerPorCorreo(string $correo): array|false
    {
        $sql = "SELECT * FROM usuarios WHERE correo = :correo";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([
            ':correo' => $correo
        ]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
