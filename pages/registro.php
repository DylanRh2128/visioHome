<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro | VisioHome</title>
    <link rel="stylesheet" href="../css/registro.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <div class="registro-container">
        <h2 class="text-center mb-4">Crear una cuenta</h2>

        <form id="registroForm">
            <div class="mb-3">
                <label for="docUsuario" class="form-label">Documento</label>
                <input type="text" class="form-control" name="docUsuario" id="docUsuario" placeholder="# Documento" required>
            </div>

            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre completo</label>
                <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Tu nombre" required>
            </div>

            <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="tel" class="form-control" name="telefono" id="telefono" placeholder="Teléfono" required>
            </div>

            <div class="mb-3">
                <label for="correo" class="form-label">Correo electrónico</label>
                <input type="email" class="form-control" name="correo" id="correo" placeholder="visioHome@gmail.com" required>
            </div>

            <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" name="direccion" id="direccion" placeholder="Dirección" required>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Contraseña" required>
            </div>

            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Repite tu contraseña</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirmar contraseña" required>
            </div>

            <button type="submit" class="btn btn-primary w-100">Crear cuenta</button>

            <p class="text-center mt-3">
                ¿Ya tienes cuenta? 
                <a href="login.php" class="text-decoration-none">Inicia sesión</a>
            </p>

            <p id="mensaje" class="text-center text-danger mt-2"></p>
        </form>

        <div class="text-center mt-3">
            <a href="../index.php" class="btn btn-outline-secondary btn-sm">Volver al inicio</a>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/validacionRegistro.js"></script>
</body>
</html>
