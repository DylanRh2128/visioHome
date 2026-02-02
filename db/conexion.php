<?php

class Conexion
{
    private static $conexion = null;

    private function __construct() {}

    public static function getConexion()
    {
        if (self::$conexion === null) {
            try {
                $host = 'localhost';
                $db   = 'visiohome';
                $user = 'root';
                $pass = '';
                $charset = 'utf8mb4';

                $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

                self::$conexion = new PDO($dsn, $user, $pass, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);

            } catch (PDOException $e) {
                error_log($e->getMessage());
                die('Error de conexión a la base de datos');
            }
        }

        return self::$conexion;
    }
}
