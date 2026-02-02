<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/PropiedadController.php';
require_once BACKEND_PATH . 'controllers/InmobiliariaController.php';

$propCtrl = new PropiedadController();
$inmoCtrl = new InmobiliariaController();
$inmobiliarias = $inmoCtrl->index();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $propCtrl->store($_POST);
    header("Location: index.php");
    exit;
}
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <h3>Crear Propiedad</h3>

  <form method="POST">
    <input name="titulo" class="form-control mb-2" placeholder="Título" required>
    <textarea name="descripcion" class="form-control mb-2" placeholder="Descripción"></textarea>
    <input name="ubicacion" class="form-control mb-2" placeholder="Ubicación" required>
    <input name="tamano_m2" class="form-control mb-2" placeholder="Tamaño m²">
    <input name="precio" class="form-control mb-2" placeholder="Precio" required>

    <select name="tipo" class="form-control mb-2" required>
      <option value="">Tipo</option>
      <option value="casa">Casa</option>
      <option value="apartamento">Apartamento</option>
      <option value="lote">Lote</option>
      <option value="oficina">Oficina</option>
      <option value="local">Local</option>
      <option value="bodega">Bodega</option>
      <option value="finca">Finca</option>
    </select>

    <select name="estado" class="form-control mb-2" required>
      <option value="disponible">Disponible</option>
      <option value="reservada">Reservada</option>
      <option value="vendida">Vendida</option>
      <option value="arrendada">Arrendada</option>
    </select>

    <select name="nitInmobiliaria" class="form-control mb-3" required>
      <option value="">Inmobiliaria</option>
      <?php foreach ($inmobiliarias as $i): ?>
        <option value="<?= $i['nitInmobiliaria'] ?>">
          <?= $i['nombre'] ?>
        </option>
      <?php endforeach ?>
    </select>

    <button class="btn btn-dark">Guardar</button>
    <a href="index.php" class="btn btn-secondary">Cancelar</a>
  </form>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
