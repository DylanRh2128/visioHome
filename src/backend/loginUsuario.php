<?php
session_start();
require_once "../../db/conexion.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $correo = trim($_POST["correo"]);
    $password = trim($_POST["password"]);

    if ($correo === "" || $password === "") {
        echo "Campos vacíos.";
        exit;
    }

    $query = $conexion->prepare("SELECT idUsuario, nombre, correo, password FROM usuarios WHERE correo = ?");
    $query->bind_param("s", $correo);
    $query->execute();
    $resultado = $query->get_result();

    if ($resultado->num_rows === 0) {
        echo "Usuario no encontrado.";
        exit;
    }

    $usuario = $resultado->fetch_assoc();

    if (!password_verify($password, $usuario["password"])) {
        echo "Contraseña incorrecta.";
        exit;
    }

    $_SESSION["idUsuario"] = $usuario["idUsuario"];
    $_SESSION["nombre"] = $usuario["nombre"];
    $_SESSION["correo"] = $usuario["correo"];

    header("Location: ../../pages/index.php");
    exit;
}
