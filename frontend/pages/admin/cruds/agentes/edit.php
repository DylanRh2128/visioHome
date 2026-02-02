<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/AgenteController.php';

$controller = new AgenteController();
$agente = $controller->edit($_GET['doc']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->update($_POST);
    header("Location: index.php");
    exit;
}
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <h3>Editar Agente</h3>

  <form method="POST">
    <input type="hidden" name="docAgente" value="<?= $agente['docAgente'] ?>">

    <input name="nombre" class="form-control mb-2" value="<?= $agente['nombre'] ?>" required>
    <input name="telefono" class="form-control mb-2" value="<?= $agente['telefono'] ?>">
    <input name="correo" type="email" class="form-control mb-3" value="<?= $agente['correo'] ?>">

    <button class="btn btn-dark">Actualizar</button>
    <a href="index.php" class="btn btn-secondary">Cancelar</a>
  </form>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
