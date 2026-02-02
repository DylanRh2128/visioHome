<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/InmobiliariaController.php';

$controller = new InmobiliariaController();
$controller->delete($_GET['nit']);

header("Location: index.php");
exit;
