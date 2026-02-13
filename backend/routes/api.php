<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AgenteController;
use App\Http\Controllers\InmobiliariaController;
use App\Http\Controllers\PropiedadController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\DashboardController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stats', [DashboardController::class, 'getStats']);
    Route::get('/stats/users', [DashboardController::class, 'getUserStats']);
    Route::get('/stats/global', [DashboardController::class, 'getGlobalStats']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('usuarios', UsuarioController::class);
    Route::apiResource('agentes', AgenteController::class);
    Route::apiResource('inmobiliarias', InmobiliariaController::class);
    Route::apiResource('propiedades', PropiedadController::class);
    Route::apiResource('pagos', PagoController::class);
});
