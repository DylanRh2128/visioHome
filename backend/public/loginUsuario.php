<?php
declare(strict_types=1);

ob_start();
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");
session_start();

require_once __DIR__ . '/../../db/conexion.php';

$response = ["success" => false, "message" => ""];

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    $response["message"] = "Método no permitido.";
    echo json_encode($response);
    exit;
}

$correo   = strtolower(trim($_POST["correo"] ?? ""));
$password = trim($_POST["password"] ?? "");

if ($correo === "" || $password === "") {
    http_response_code(400);
    $response["message"] = "Correo y contraseña son obligatorios.";
    echo json_encode($response);
    exit;
}

$sql = "
    SELECT docUsuario, nombre, correo, password, idRol, intentosFallidos, bloqueadoHasta
    FROM usuarios
    WHERE correo = ?
    LIMIT 1
";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();

$user = $stmt->get_result()->fetch_assoc();

if (!$user) {
    http_response_code(401);
    $response["message"] = "Credenciales incorrectas.";
    echo json_encode($response);
    exit;
}

// 🔒 Bloqueo
if (!empty($user['bloqueadoHasta']) && strtotime($user['bloqueadoHasta']) > time()) {
    http_response_code(403);
    $response["message"] = "Cuenta bloqueada temporalmente.";
    echo json_encode($response);
    exit;
}

// 🔑 Password
if (!password_verify($password, $user['password'])) {

    $intentos = (int)$user['intentosFallidos'] + 1;

    if ($intentos >= 3) {
        $bloqueadoHasta = date("Y-m-d H:i:s", strtotime("+10 minutes"));
        $upd = $conexion->prepare("
            UPDATE usuarios 
            SET intentosFallidos = ?, bloqueadoHasta = ?
            WHERE correo = ?
        ");
        $upd->bind_param("iss", $intentos, $bloqueadoHasta, $correo);
        $response["message"] = "Cuenta bloqueada por intentos fallidos.";
    } else {
        $upd = $conexion->prepare("
            UPDATE usuarios 
            SET intentosFallidos = ?
            WHERE correo = ?
        ");
        $upd->bind_param("is", $intentos, $correo);
        $response["message"] = "Credenciales incorrectas. Intento $intentos de 3.";
    }

    $upd->execute();
    http_response_code(401);
    echo json_encode($response);
    exit;
}

// ✅ Login correcto
$reset = $conexion->prepare("
    UPDATE usuarios 
    SET intentosFallidos = 0, bloqueadoHasta = NULL
    WHERE correo = ?
");
$reset->bind_param("s", $correo);
$reset->execute();

$_SESSION['user'] = [
    "docUsuario" => $user["docUsuario"],
    "nombre"    => $user["nombre"],
    "correo"    => $user["correo"],
    "idRol"     => $user["idRol"]
];

$response["success"] = true;
$response["rol"]     = $user["idRol"];
$response["message"] = "Inicio de sesión correcto.";

ob_clean();
echo json_encode($response);
exit;
