<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/PropiedadController.php';

$controller = new PropiedadController();
$propiedades = $controller->index();
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <div class="d-flex justify-content-between mb-3">
    <h3>Propiedades</h3>
    <a href="create.php" class="btn btn-dark">+ Nueva Propiedad</a>
  </div>

  <table class="table table-bordered">
    <thead class="table-dark">
      <tr>
        <th>Título</th>
        <th>Ubicación</th>
        <th>Tipo</th>
        <th>Precio</th>
        <th>Estado</th>
        <th width="180">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($propiedades as $p): ?>
        <tr>
          <td><?= $p['titulo'] ?></td>
          <td><?= $p['ubicacion'] ?></td>
          <td><?= $p['tipo'] ?></td>
          <td>$<?= number_format($p['precio']) ?></td>
          <td><?= $p['estado'] ?></td>
          <td class="text-center">
            <a href="edit.php?id=<?= $p['idPropiedad'] ?>" class="btn btn-warning btn-sm">Editar</a>
            <a href="delete.php?id=<?= $p['idPropiedad'] ?>" class="btn btn-danger btn-sm"
               onclick="return confirm('¿Eliminar propiedad?')">Eliminar</a>
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
        