<?php

require_once __DIR__ . '/../models/Agente.php';

class AgenteController
{
    private Agente $model;

    public function __construct()
    {
        $this->model = new Agente();
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

    public function edit(string $docAgente): array|false
    {
        return $this->model->obtenerPorDocumento($docAgente);
    }

    public function update(array $data): void
    {
        $this->model->actualizar($data);
        header("Location: index.php");
        exit;
    }

    public function delete(string $docAgente): void
    {
        $this->model->eliminar($docAgente);
        header("Location: index.php");
        exit;
    }
}
