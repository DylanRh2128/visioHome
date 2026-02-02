<?php

require_once __DIR__ . '/../models/Inmobiliaria.php';

class InmobiliariaController
{
    private Inmobiliaria $model;

    public function __construct()
    {
        $this->model = new Inmobiliaria();
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

    public function edit(string $nitInmobiliaria): array|false
    {
        return $this->model->obtenerPorNit($nitInmobiliaria);
    }

    public function update(array $data): void
    {
        $this->model->actualizar($data);
        header("Location: index.php");
        exit;
    }

    public function delete(string $nitInmobiliaria): void
    {
        $this->model->eliminar($nitInmobiliaria);
        header("Location: index.php");
        exit;
    }
}
