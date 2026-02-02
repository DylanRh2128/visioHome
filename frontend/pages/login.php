<<<<<<< HEAD
<?php
require_once __DIR__ . '/../../config/app.php';
?>

=======
>>>>>>> origin/develop
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
<<<<<<< HEAD
  <title>Iniciar Sesión | VisioHome</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="<?= BASE_URL ?>frontend/css/login.css">
</head>
<body>


<div class="container mt-5">
  <h3 class="text-center mb-4">Iniciar Sesión</h3>

  <form id="loginForm" class="mx-auto" style="max-width: 400px;">
    <div class="mb-3">
      <label>Correo electrónico</label>
      <input type="email" class="form-control" name="correo" required>
    </div>

    <div class="mb-3">
      <label>Contraseña</label>
      <input type="password" class="form-control" name="password" autocomplete="current-password" required>
    </div>

    <button class="btn btn-dark w-100">Entrar</button>
=======
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Iniciar Sesión | VisioHome</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/login.css">
</head>
<body>

  <?php include '../components/navbar.php'; ?>

  <div class="container mt-10">
  <h3 class="text-center mb-4 mt-5">Iniciar Sesión</h3>

  <form id="loginForm" class="mx-auto" style="max-width: 400px;">
    <div class="mb-3">
      <label for="correo" class="form-label">Correo electrónico</label>
      <input type="email" class="form-control" name="correo" id="correo" required>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Contraseña</label>
      <input type="password" class="form-control" name="password" id="password" required>
    </div>

    <button type="submit" class="btn btn-dark w-100">Entrar</button>
>>>>>>> origin/develop
  </form>

  <div id="mensaje" class="text-center mt-3"></div>
</div>

<<<<<<< HEAD
<script src="<?= BASE_URL ?>frontend/js/validacionLogin.js"></script>
=======
<script src="/VisioHome/frontend/js/validacionLogin.js"></script>

>>>>>>> origin/develop
</body>
</html>
