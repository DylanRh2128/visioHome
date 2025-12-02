<?php
header("Content-Type: application/json; charset=UTF-8");
include "../db/conexion.php";

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $docUsuario = trim($_POST["docUsuario"] ?? "");
    $nombre = trim($_POST["nombre"] ?? "");
    $telefono = trim($_POST["telefono"] ?? "");
    $correo = trim($_POST["correo"] ?? "");
    $direccion = trim($_POST["direccion"] ?? "");
    $password = trim($_POST["password"] ?? "");
    $idRol = 2;

    if (!$docUsuario || !$nombre || !$telefono || !$correo || !$direccion || !$password) {
        $response["message"] = "Por favor completa todos los campos.";
        echo json_encode($response);
        exit;
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $response["message"] = "El correo electrónico no es válido.";
        echo json_encode($response);
        exit;
    }

    if (!preg_match("/^\d{6,12}$/", $docUsuario)) {
        $response["message"] = "El número de documento no es válido.";
        echo json_encode($response);
        exit;
    }

    if (!preg_match("/^\d{10}$/", $telefono)) {
        $response["message"] = "El teléfono debe tener 10 dígitos.";
        echo json_encode($response);
        exit;
    }

    if (strlen($password) < 6 || strlen($password) > 12) {
        $response["message"] = "La contraseña debe tener entre 6 y 12 caracteres.";
        echo json_encode($response);
        exit;
    }

    if (
        !preg_match("/[A-Z]/", $password) ||
        !preg_match("/[a-z]/", $password) ||
        !preg_match("/\d/", $password)
    ) {
        $response["message"] = "La contraseña debe incluir al menos una mayúscula, una minúscula y un número.";
        echo json_encode($response);
        exit;
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $check = $conexion->prepare("SELECT * FROM usuarios WHERE docUsuario = ? OR correo = ?");
    $check->bind_param("ss", $docUsuario, $correo);
    $check->execute();
    $resultado = $check->get_result();

    if ($resultado->num_rows > 0) {
        $response["message"] = "Ya existe un usuario registrado con ese documento o correo.";
        echo json_encode($response);
        exit;
    }

    $sql = $conexion->prepare("
        INSERT INTO usuarios (docUsuario, nombre, correo, telefono, direccion, password, idRol)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $sql->bind_param("ssssssi", $docUsuario, $nombre, $correo, $telefono, $direccion, $passwordHash, $idRol);

    if ($sql->execute()) {
        $response["success"] = true;
        $response["message"] = "Registro exitoso. Bienvenido a VisioHome.";
    } else {
        $response["message"] = "Ocurrió un error al registrar tu cuenta. Intenta de nuevo.";
    }

    $sql->close();
    $conexion->close();

    echo json_encode($response);
} else {
    $response["message"] = "Método no permitido.";
    echo json_encode($response);
}
?>
