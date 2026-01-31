<?php
$cssPage= 'registro'; // Definir la hoja de estilo específica para la página actual
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>VisioHome</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- CSS global -->
    <link rel="stylesheet" href="<?= BASE_URL ?>frontend/css/index.css">

    <!-- CSS por página -->
    <?php if (!empty($cssPage)): ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>frontend/css/<?= $cssPage ?>.css">
    <?php endif; ?>
</head>
<body>

<header>
    <div class="logo">VisioHome</div>
    <nav>
        <a href="<?= BASE_URL ?>index.php?page=home">Inicio</a>
        <a href="<?= BASE_URL ?>index.php?page=login">Login</a>
        <a href="<?= BASE_URL ?>index.php?page=registro">Registro</a>
        <a href="#">En venta</a>
    </nav>
</header>
