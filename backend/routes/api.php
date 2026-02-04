<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AgenteController;
use App\Http\Controllers\InmobiliariaController;
use App\Http\Controllers\PropiedadController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('agentes', AgenteController::class);
Route::apiResource('inmobiliarias', InmobiliariaController::class);
Route::apiResource('propiedades', PropiedadController::class);
