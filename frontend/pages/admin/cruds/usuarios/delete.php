<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/UsuarioController.php';

$controller = new UsuarioController();
$controller->delete($_GET['doc']);

header("Location: index.php");
exit;
