<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/InmobiliariaController.php';

$controller = new InmobiliariaController();
$inmobiliaria = $controller->edit($_GET['nit']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->update($_POST);
    header("Location: index.php");
    exit;
}
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <h3>Editar Inmobiliaria</h3>

  <form method="POST">
    <input type="hidden" name="nitInmobiliaria" value="<?= $inmobiliaria['nitInmobiliaria'] ?>">

    <input name="nombre" class="form-control mb-2" value="<?= $inmobiliaria['nombre'] ?>" required>
    <input name="correo" type="email" class="form-control mb-2" value="<?= $inmobiliaria['correo'] ?>">
    <input name="telefono" class="form-control mb-2" value="<?= $inmobiliaria['telefono'] ?>">
    <input name="direccion" class="form-control mb-2" value="<?= $inmobiliaria['direccion'] ?>">
    <textarea name="objetivo" class="form-control mb-3"><?= $inmobiliaria['objetivo'] ?></textarea>

    <button class="btn btn-dark">Actualizar</button>
    <a href="index.php" class="btn btn-secondary">Cancelar</a>
  </form>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
