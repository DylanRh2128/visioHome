<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/UsuarioController.php';

$controller = new UsuarioController();
$usuario = $controller->edit($_GET['doc']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $controller->update($_POST);
    header("Location: index.php");
    exit;
}
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <h3>Editar Usuario</h3>

  <form method="POST">
    <input type="hidden" name="docUsuario" value="<?= $usuario['docUsuario'] ?>">

    <input name="nombre" class="form-control mb-2" value="<?= $usuario['nombre'] ?>" required>
    <input name="correo" type="email" class="form-control mb-2" value="<?= $usuario['correo'] ?>" required>
    <input name="telefono" class="form-control mb-2" value="<?= $usuario['telefono'] ?>">
    <input name="direccion" class="form-control mb-2" value="<?= $usuario['direccion'] ?>">

    <select name="idRol" class="form-control mb-3">
      <option value="1" <?= $usuario['idRol']==1?'selected':'' ?>>Admin</option>
      <option value="2" <?= $usuario['idRol']==2?'selected':'' ?>>Cliente</option>
      <option value="3" <?= $usuario['idRol']==3?'selected':'' ?>>Agente</option>
    </select>

    <button class="btn btn-dark">Actualizar</button>
    <a href="index.php" class="btn btn-secondary">Cancelar</a>
  </form>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
