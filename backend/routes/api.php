<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AgenteController;
use App\Http\Controllers\DisponibilidadController;
use App\Http\Controllers\InmobiliariaController;
use App\Http\Controllers\PropiedadController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Api\UserDashboardController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ConfigurationController;
use App\Http\Controllers\Modelo3DController;

// ─── Autenticación pública (Unificada) ────────────────────────────────────────
Route::post('/login',    [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// ─── Rutas públicas (sin autenticación) ──────────────────────────────────────
Route::get('/propiedades/{id}/modelo3d', [Modelo3DController::class, 'show']);

// ─── Rutas protegidas (requieren token Sanctum) ───────────────────────────────
// ─── Webhooks ───────────────────────────────────────────────────────────────
Route::post('/webhooks/mercadopago', [App\Http\Controllers\Api\WebhookController::class, 'handleMercadoPago']);
Route::get('/system-status', [App\Http\Controllers\Api\ConfigurationController::class, 'getStatus']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // ── Admin / Dashboard ──────────────────────────────────────────────────────
    Route::get('/stats',        [DashboardController::class, 'getStats']);
    Route::get('/stats/users',  [DashboardController::class, 'getUserStats']);
    Route::get('/stats/global', [DashboardController::class, 'getGlobalStats']);

    // ── Módulo de Usuario (Clientes) ───────────────────────────────────────────
    Route::prefix('user')->group(function () {

        // Dashboard
        Route::get('/dashboard', [UserDashboardController::class, 'getDashboardData']);

        // Búsqueda de propiedades
        Route::get('/search', [SearchController::class, 'search']);

        // Perfil
        Route::get('/profile',         [ProfileController::class, 'show']);
        Route::put('/profile',         [ProfileController::class, 'update']);
        Route::post('/profile/avatar', [ProfileController::class, 'uploadAvatar']);

        // Favoritos
        Route::get('/favorites',              [FavoriteController::class, 'index']);
        Route::post('/favorites/toggle/{id}', [FavoriteController::class, 'toggle']);
        Route::get('/favorites/check/{id}',   [FavoriteController::class, 'check']);

        // Nuevos endpoints de favoritos (Tarea 2)
        Route::get('/favoritos',           [FavoriteController::class, 'index']);
        Route::post('/favoritos',          [FavoriteController::class, 'store']);
        Route::delete('/favoritos/{id}',   [FavoriteController::class, 'destroy']);

        // Appointment (Citas)
        Route::get('/appointments',              [\App\Http\Controllers\Api\CitaController::class, 'index']);
        Route::post('/appointments',             [\App\Http\Controllers\Api\CitaController::class, 'store']);
        Route::put('/appointments/cancel/{id}',  [\App\Http\Controllers\Api\CitaController::class, 'cancel']);

        // Agentes (para usuario: listar, ver detalle, valorar)
        Route::get('/agentes',            [\App\Http\Controllers\Api\AgenteController::class, 'index']);
        Route::get('/agentes/{id}',       [\App\Http\Controllers\Api\AgenteController::class, 'show']);
        Route::post('/agentes/rate',      [\App\Http\Controllers\Api\AgenteController::class, 'rate']);

        // ── Disponibilidad de agente (consulta pública autenticada) ─────────
        Route::get('/agentes/{docAgente}/disponibilidad', [DisponibilidadController::class, 'show']);

        // ── Comentarios y calificaciones de propiedades
        Route::get('/comments/{idPropiedad}',  [CommentController::class, 'getByProperty']);
        Route::post('/comments',               [CommentController::class, 'store']);
        Route::delete('/comments/{id}',        [CommentController::class, 'destroy']);

        // Payment link inside user prefix
        Route::get('appointments/{id}/payment-link', [\App\Http\Controllers\Api\CitaController::class, 'getPaymentLink']);
    });

    // ── Panel Agente ──────────────────────────────────────────────────────────
    Route::middleware(['role:agente'])->prefix('agente')->group(function () {
        // El logout es global, se usa el de arriba (per-token)
        
        Route::get('/stats',   [\App\Http\Controllers\AgenteDashboardController::class, 'getStats']);
        Route::get('/me',      [ProfileController::class, 'show']); // Unificado con ProfileController

        // Appointments (Citas) para agentes
        Route::get('/citas',                     [\App\Http\Controllers\Api\CitaController::class, 'agenteIndex']); // Compatibilidad
        Route::get('/appointments',              [\App\Http\Controllers\Api\CitaController::class, 'agenteIndex']);
        Route::put('/appointments/confirm/{id}', [\App\Http\Controllers\Api\CitaController::class, 'confirmarCita']);
        Route::put('/appointments/cancel/{id}',  [\App\Http\Controllers\Api\CitaController::class, 'cancelarPorAgente']);

        // Disponibilidades propias del agente
        Route::get('/disponibilidades',          [DisponibilidadController::class, 'index']);
        Route::post('/disponibilidades',         [DisponibilidadController::class, 'store']);
        Route::delete('/disponibilidades/{id}',  [DisponibilidadController::class, 'destroy']);
    });

    // ── CRUDs de administración (Unificados) ───────────────────────────────────
    Route::get('/usuarios/stats/global', [UsuarioController::class, 'globalStats']);
    Route::apiResource('usuarios',      UsuarioController::class);
    Route::apiResource('agentes',       AgenteController::class);
    Route::apiResource('inmobiliarias', InmobiliariaController::class);
    Route::apiResource('propiedades',   PropiedadController::class);
    Route::apiResource('pagos',         PagoController::class);
    
    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('configurations',       [ConfigurationController::class, 'index']);
        Route::put('configurations/{key}', [ConfigurationController::class, 'update']);
    });
});

