<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inicio | VisioHome</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/inicio.css">
</head>
<body>
  <?php include '../src/includes/navbar.php'; ?>

  <div class="container mt-5">
    <h2 class="mb-4 text-center text-info">Panel del Usuario</h2>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card p-4 text-center">
          <h5>Mis Propiedades</h5>
          <p>Administra las propiedades que has publicado o visitado.</p>
          <button class="btn btn-dashboard">Ver más</button>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-4 text-center">
          <h5>Explorar</h5>
          <p>Descubre nuevas viviendas en realidad aumentada.</p>
          <button class="btn btn-dashboard">Explorar</button>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card p-4 text-center">
          <h5>Perfil</h5>
          <p>Actualiza tu información y configuración de cuenta.</p>
          <button class="btn btn-dashboard">Editar Perfil</button>
        </div>
      </div>
    </div>
  </div>

  <footer class="text-center mt-5 text-secondary">
    <p>© 2025 VisioH
