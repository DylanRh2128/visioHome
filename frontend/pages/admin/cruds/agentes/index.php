<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/AgenteController.php';

$controller = new AgenteController();
$agentes = $controller->index();
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <div class="d-flex justify-content-between mb-3">
    <h3>Agentes</h3>
    <a href="create.php" class="btn btn-dark">+ Nuevo Agente</a>
  </div>

  <table class="table table-bordered">
    <thead class="table-dark">
      <tr>
        <th>Documento</th>
        <th>Nombre</th>
        <th>Teléfono</th>
        <th>Email</th>
        <th width="180">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($agentes as $a): ?>
        <tr>
          <td><?= $a['docAgente'] ?></td>
          <td><?= $a['nombre'] ?></td>
          <td><?= $a['telefono'] ?></td>
          <td><?= $a['correo'] ?></td>
          <td class="text-center">
            <a href="edit.php?doc=<?= $a['docAgente'] ?>" class="btn btn-warning btn-sm">Editar</a>
            <a href="delete.php?doc=<?= $a['docAgente'] ?>" class="btn btn-danger btn-sm"
               onclick="return confirm('¿Eliminar agente?')">Eliminar</a>
          </td>
        </tr>
      <?php endforeach ?>
    </tbody>
  </table>

  <a href="<?= BASE_URL ?>frontend/pages/admin/dashboard.php" class="btn btn-secondary">
    ⬅ Volver
  </a>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
