<?php
header("Content-Type: application/json; charset=UTF-8");
include '../../db/conexion.php';
session_start();

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    $response["message"] = "Método no permitido.";
    echo json_encode($response);
    exit;
}

$correo = trim($_POST["correo"] ?? "");
$password = trim($_POST["password"] ?? "");

if (!$correo || !$password) {
    http_response_code(400);
    $response["message"] = "Correo y contraseña son obligatorios.";
    echo json_encode($response);
    exit;
}

$consulta = "SELECT docUsuario, nombre, correo, password, idRol FROM usuarios WHERE correo = ? LIMIT 1";
if ($stmt = $conexion->prepare($consulta)) {

    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $row = $result->fetch_assoc()) {

        $hash = $row['password'] ?? '';
        $passwordOk = false;

        if ($hash && password_verify($password, $hash)) {
            $passwordOk = true;
        } else {
            if ($password === $hash) $passwordOk = true;
        }

        if ($passwordOk) {

            $_SESSION['user'] = [
                'docUsuario' => $row['docUsuario'],
                'nombre'     => $row['nombre'],
                'correo'     => $row['correo'],
                'idRol'      => $row['idRol']
            ];

            $isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
                      && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

            if ($isAjax) {
                $response['success'] = true;
                $response['message'] = 'Inicio de sesión correcto.';
                echo json_encode($response);
                exit;
            } else {
                header('Location: /VisioHome/pages/nosotros.php');
                exit;
            }

        } else {
            http_response_code(401);
            $response['message'] = 'Credenciales incorrectas.';
            echo json_encode($response);
            exit;
        }

    } else {
        http_response_code(404);
        $response['message'] = 'Usuario no encontrado.';
        echo json_encode($response);
        exit;
    }

} else {
    http_response_code(500);
    $response['message'] = 'Error en la consulta a la base de datos.';
    echo json_encode($response);
    exit;
}
?>
