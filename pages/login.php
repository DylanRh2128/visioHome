<<<<<<< HEAD
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Iniciar Sesión | VisioHome</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

  <?php include '../src/includes/navbar.php'; ?>

  <div class="container mt-5">
    <h3 class="text-center mb-4">Iniciar Sesión</h3>
    <form action="../src/backend/loginUsuario.php" method="POST" class="mx-auto" style="max-width: 400px;">
      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <input type="email" class="form-control" name="correo" id="correo" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input type="password" class="form-control" name="password" id="password" required>
      </div>
      <button type="submit" class="btn btn-success w-100">Entrar</button>
    </form>
  </div>

</body>
</html>
=======
<?php
include "../Db/conexion.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") { // Verifica si el formulario fue enviado

    
    $usuario = $_POST["usuario"];
    $password = $_POST["password"];
    $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND password = '$password'";
    $resultado = mysqli_query($conexion, $sql);
    if (mysqli_num_rows($resultado) > 0) {
        session_start();
        $_SESSION["usuario"] = $usuario;

        echo "<script> alert('Inicio de sesión exitoso👍');
                window.location.href='../index.html' </script>";
    } else {
        echo "<script> alert('Usuario o contraseña incorrectos❎');
                window.location.href='login.php'</script>";
    }
}
?>

>>>>>>> d8018a71f212e8ed5f54228e993c3f886604e346
