<?php
require_once __DIR__ . '/../../../../../config/app.php';
session_start();

require_once BACKEND_PATH . 'controllers/PropiedadController.php';
require_once BACKEND_PATH . 'controllers/InmobiliariaController.php';

$propCtrl = new PropiedadController();
$inmoCtrl = new InmobiliariaController();

$propiedad = $propCtrl->edit($_GET['id']);
$inmobiliarias = $inmoCtrl->index();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $propCtrl->update($_POST);
    header("Location: index.php");
    exit;
}
?>

<?php require COMPONENTS_PATH . 'header.php'; ?>

<div class="container mt-4">
  <h3>Editar Propiedad</h3>

  <form method="POST">
    <input type="hidden" name="idPropiedad" value="<?= $propiedad['idPropiedad'] ?>">

    <input name="titulo" class="form-control mb-2" value="<?= $propiedad['titulo'] ?>" required>
    <textarea name="descripcion" class="form-control mb-2"><?= $propiedad['descripcion'] ?></textarea>
    <input name="ubicacion" class="form-control mb-2" value="<?= $propiedad['ubicacion'] ?>" required>
    <input name="tamano_m2" class="form-control mb-2" value="<?= $propiedad['tamano_m2'] ?>">
    <input name="precio" class="form-control mb-2" value="<?= $propiedad['precio'] ?>" required>

    <select name="tipo" class="form-control mb-2">
      <?php foreach (['casa','apartamento','lote','oficina','local','bodega','finca'] as $t): ?>
        <option value="<?= $t ?>" <?= $propiedad['tipo']===$t?'selected':'' ?>>
          <?= ucfirst($t) ?>
        </option>
      <?php endforeach ?>
    </select>

    <select name="estado" class="form-control mb-2">
      <?php foreach (['disponible','reservada','vendida','arrendada'] as $e): ?>
        <option value="<?= $e ?>" <?= $propiedad['estado']===$e?'selected':'' ?>>
          <?= ucfirst($e) ?>
        </option>
      <?php endforeach ?>
    </select>

    <select name="nitInmobiliaria" class="form-control mb-3">
      <?php foreach ($inmobiliarias as $i): ?>
        <option value="<?= $i['nitInmobiliaria'] ?>"
          <?= $propiedad['nitInmobiliaria']===$i['nitInmobiliaria']?'selected':'' ?>>
          <?= $i['nombre'] ?>
        </option>
      <?php endforeach ?>
    </select>

    <button class="btn btn-dark">Actualizar</button>
    <a href="index.php" class="btn btn-secondary">Cancelar</a>
  </form>
</div>

<?php require COMPONENTS_PATH . 'footer.php'; ?>
