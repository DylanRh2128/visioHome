<?php

require_once __DIR__ . '/../models/Usuario.php';

class UsuarioController
{
    private Usuario $model;

    public function __construct()
    {
        $this->model = new Usuario();
    }

    public function index(): array
    {
        return $this->model->obtenerTodos();
    }

    public function store(array $data): void
    {
        $this->model->crear($data);
        header("Location: index.php");
        exit;
    }

    public function edit(string $docUsuario): array|false
    {
        return $this->model->obtenerPorDocumento($docUsuario);
    }

    public function update(array $data): void
    {
        $this->model->actualizar($data);
        header("Location: index.php");
        exit;
    }

    public function delete(string $docUsuario): void
    {
        $this->model->eliminar($docUsuario);
        header("Location: index.php");
        exit;
    }
}
