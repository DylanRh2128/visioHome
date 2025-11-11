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
