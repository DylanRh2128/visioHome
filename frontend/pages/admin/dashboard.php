<?php
require_once __DIR__ . '/../../../config/app.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (
    !isset($_SESSION['user']) ||
    (int)$_SESSION['user']['idRol'] !== 1
) {
    header("Location: " . BASE_URL . "index.php?page=login");
    exit;
}

$page = $_GET['page'] ?? 'inicio';
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container-fluid">
  <div class="row">

    <!-- SIDEBAR -->
    <aside class="col-2 bg-dark text-white vh-100 p-3">
      <h4 class="mb-4">Admin</h4>
      <ul class="nav flex-column gap-2">
        <li><a class="text-white" href="?page=inicio">Inicio</a></li>
        <li><a class="text-white" href="?page=ventas">Ventas</a></li>
        <li>
          <a class="text-white" href="<?= BASE_URL ?>frontend/pages/admin/cruds/index.php">
            Usuarios
          </a>
        </li>
        <li><a class="text-white" href="?page=3d">3D</a></li>
        <li>
          <a class="text-white" href="<?= BASE_URL ?>frontend/pages/admin/cruds/index.php">
            Administración
          </a>
        </li>
      </ul>
    </aside>

    <!-- CONTENIDO -->
    <main class="col-10 p-4">
      <?php
        switch ($page) {
            case 'ventas':
                require __DIR__ . '/partials/ventas.php';
                break;
            case '3d':
                require __DIR__ . '/partials/vista3d.php';
                break;
            default:
                require __DIR__ . '/partials/inicio.php';
        }
      ?>
    </main>

  </div>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
