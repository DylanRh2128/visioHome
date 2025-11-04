<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="../index.html">Inicio</a>
    <a href="register.php">Registro</a>
    <a href="login.php">Login</a>
    

    <div class="contenedor">
    
        <form id="registroForm" class="formulario">
            <h2>Crear una cuenta</h2>

            <input type="text" name="docUsuario" id="docUsuario" placeholder="# Documento" required>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre" required>
            <input type="tel" name="telefono" id="telefono" placeholder="Teléfono" required>
            <input type="email" name="correo" id="correo" placeholder="visioHome@gmail.com" required>
            <input type="text" name="direccion" id="direccion" placeholder="Dirección" required>
            <input type="password" name="password" id="password" placeholder="Contraseña" required>
            <input type="password" id="confirmPassword" placeholder="Repite tu contraseña">

            <button type="submit" class="btn-crear">Crear Cuenta</button>
            <p class="mensaje" id="mensaje"></p>
        </form>

    </div>
    <script src="../src/js/validacionRegistro.js"></script>
</body>
</html>