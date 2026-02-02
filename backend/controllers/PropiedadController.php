<?php

require_once __DIR__ . '/../models/Propiedad.php';

class PropiedadController
{
    private Propiedad $model;

    public function __construct()
    {
        $this->model = new Propiedad();
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

    public function edit(int $idPropiedad): array|false
    {
        return $this->model->obtenerPorId($idPropiedad);
    }

    public function update(array $data): void
    {
        $this->model->actualizar($data);
        header("Location: index.php");
        exit;
    }

    public function delete(int $idPropiedad): void
    {
        $this->model->eliminar($idPropiedad);
        header("Location: index.php");
        exit;
    }
}
