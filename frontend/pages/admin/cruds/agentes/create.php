<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/AgenteController.php';

$controller = new AgenteController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->store($_POST);
    header("Location: index.php");
    exit;
}
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <h3>Crear Agente</h3>

  <form method="POST">
    <input name="docAgente" class="form-control mb-2" placeholder="Documento" required>
    <input name="nombre" class="form-control mb-2" placeholder="Nombre" required>
    <input name="telefono" class="form-control mb-2" placeholder="Teléfono">
    <input name="correo" type="email" class="form-control mb-3" placeholder="Correo">

    <button class="btn btn-dark">Guardar</button>
    <a href="index.php" class="btn btn-secondary">Cancelar</a>
  </form>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
