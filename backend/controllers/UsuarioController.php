<?php

require_once __DIR__ . '/../models/Usuario.php';

class UsuarioController {

    private $model;

    public function __construct() {
        $this->model = new Usuario();
    }

    public function index() {
        return $this->model->obtenerTodos();
    }

    public function store($data) {
        $this->model->crear($data);
        header("Location: /index.php?page=admin/crudUsuarios");
    }

    public function edit($docUsuario) {
        return $this->model->obtenerPorDocumento($docUsuario);
    }

    public function update($data) {
        $this->model->actualizar($data);
        header("Location: /index.php?page=admin/crudUsuarios");
    }

    public function delete($docUsuario) {
        $this->model->eliminar($docUsuario);
        header("Location: /index.php?page=admin/crudUsuarios");
    }
}
