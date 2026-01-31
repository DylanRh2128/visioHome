<?php
include COMPONENTS_PATH . 'sidebar.php';
?>

<main class="admin-content">
    <h1 class="admin-title">Panel de Administración</h1>

    <div class="admin-grid">
        <a href="<?= BASE_URL ?>index.php?page=admin/cruds/crudUsuarios" class="admin-card">
            <h3>Usuarios</h3>
            <p>Gestionar usuarios del sistema</p>
        </a>

        <a href="#" class="admin-card">
            <h3>Agentes</h3>
            <p>Administrar agentes inmobiliarios</p>
        </a>

        <a href="#" class="admin-card">
            <h3>Inmobiliarias</h3>
            <p>Empresas registradas</p>
        </a>

        <a href="#" class="admin-card">
            <h3>Propiedades</h3>
            <p>Listado de propiedades</p>
        </a>

        <a href="#" class="admin-card">
            <h3>Citas</h3>
            <p>Agendamiento de visitas</p>
        </a>

        <a href="#" class="admin-card">
            <h3>Pagos</h3>
            <p>Historial y control de pagos</p>
        </a>
    </div>
</main>
