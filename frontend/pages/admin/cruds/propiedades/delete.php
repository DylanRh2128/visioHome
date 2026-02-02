<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/PropiedadController.php';

$controller = new PropiedadController();
$controller->delete($_GET['id']);

header("Location: index.php");
exit;
