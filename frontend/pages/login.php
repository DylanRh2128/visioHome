<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
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
  </form>

  <div id="mensaje" class="text-center mt-3"></div>
</div>

<script src="/VisioHome/frontend/js/validacionLogin.js"></script>

</body>
</html>
