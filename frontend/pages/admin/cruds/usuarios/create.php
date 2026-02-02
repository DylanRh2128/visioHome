<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/UsuarioController.php';

$controller = new UsuarioController();
$usuarios = $controller->index();
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h3>Usuarios</h3>
    <a href="create.php" class="btn btn-dark">+ Nuevo Usuario</a>
  </div>

  <table class="table table-bordered table-hover">
    <thead class="table-dark">
      <tr>
        <th>Documento</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Rol</th>
        <th width="180">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($usuarios as $u): ?>
        <tr>
          <td><?= $u['docUsuario'] ?></td>
          <td><?= $u['nombre'] ?></td>
          <td><?= $u['correo'] ?></td>
          <td><?= $u['idRol'] ?></td>
          <td class="text-center">
            <a href="edit.php?doc=<?= $u['docUsuario'] ?>" class="btn btn-sm btn-warning">Editar</a>
            <a href="delete.php?doc=<?= $u['docUsuario'] ?>" 
               class="btn btn-sm btn-danger"
               onclick="return confirm('¿Eliminar este usuario?')">
               Eliminar
            </a>
          </td>
        </tr>
      <?php endforeach ?>
    </tbody>
  </table>

  <a href="<?= BASE_URL ?>frontend/pages/admin/dashboard.php" class="btn btn-secondary">
    ⬅ Volver al Dashboard
  </a>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
