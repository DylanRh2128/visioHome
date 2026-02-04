<?php
require_once __DIR__ . '/config/app.php';
session_start();

// ===============================
// OBTENER RUTA
// ===============================
$page = $_GET['page'] ?? 'home';
$page = trim($page, '/');

// ===============================
// PÁGINAS SIN FOOTER
// ===============================
$noFooterPages = ['login', 'registro'];

// ===============================
// HEADER (siempre primero)
// ===============================
require COMPONENTS_PATH . 'header.php';

// ===============================
// ROUTER PRINCIPAL
// ===============================
switch ($page) {

    // --------- PÚBLICAS ---------
    case 'home':
        require PAGES_PATH . 'home.php';
        break;

    case 'login':
        require PAGES_PATH . 'login.php';
        break;

    case 'registro':
        require PAGES_PATH . 'registro.php';
        break;

    // --------- ADMIN / CRUDS ---------
    case 'admin/cruds/index':
        require PAGES_PATH . 'admin/cruds/index.php';
        break;

    case 'admin/cruds/crudUsuarios':
        require PAGES_PATH . 'admin/cruds/crudUsuarios.php';
        break;

    // --------- 404 ---------
    default:
        require PAGES_PATH . '404.php';
        break;
}

// ===============================
// FOOTER (condicional)
// ===============================
if (!in_array($page, $noFooterPages)) {
    require COMPONENTS_PATH . 'footer.php';
}
