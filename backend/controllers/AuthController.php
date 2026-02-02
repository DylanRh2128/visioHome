<?php

declare(strict_types=1);

require_once __DIR__ . '/../models/Usuario.php';

class AuthController
{
    private Usuario $usuarioModel;

    public function __construct()
    {
        $this->usuarioModel = new Usuario();
        session_start();
        header("Content-Type: application/json; charset=UTF-8");
    }

    // ===============================
    // LOGIN
    // ===============================
    public function login(array $data): void
    {
        $correo   = strtolower(trim($data['correo'] ?? ''));
        $password = trim($data['password'] ?? '');

        if ($correo === '' || $password === '') {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
            exit;
        }

        $user = $this->usuarioModel->obtenerPorCorreo($correo);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
            exit;
        }

        if (!empty($user['bloqueadoHasta']) && strtotime($user['bloqueadoHasta']) > time()) {
            http_response_code(403);
            echo json_encode(['success' => false, 'message' => 'Cuenta bloqueada temporalmente']);
            exit;
        }

        if (!password_verify($password, $user['password'])) {

            $this->usuarioModel->incrementarIntentos($correo);

            if ($user['intentosFallidos'] + 1 >= 3) {
                $this->usuarioModel->bloquear(
                    $correo,
                    date('Y-m-d H:i:s', strtotime('+10 minutes'))
                );
            }

            http_response_code(401);
            echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
            exit;
        }

        $this->usuarioModel->resetIntentos($correo);

        $_SESSION['user'] = [
            'docUsuario' => $user['docUsuario'],
            'nombre'     => $user['nombre'],
            'correo'     => $user['correo'],
            'idRol'      => $user['idRol']
        ];

        echo json_encode([
            'success' => true,
            'rol'     => $user['idRol']
        ]);
        exit;
    }

    // ===============================
    // REGISTER
    // ===============================
    public function register(array $data): void
    {
        if (empty($data['docUsuario']) || empty($data['password'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
            exit;
        }

        $this->usuarioModel->crear($data);

        echo json_encode([
            'success' => true,
            'message' => 'Usuario registrado correctamente'
        ]);
        exit;
    }
}
// ===============================
// ROUTER SIMPLE
// ===============================
$action = $_GET['action'] ?? null;

$controller = new AuthController();

switch ($action) {
    case 'login':
        $controller->login($_POST);
        break;

    case 'register':
        $controller->register($_POST);
        break;

    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Acción no válida'
        ]);
}
