<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!$request->user()) {
            return response()->json(['error' => 'No autenticado'], 401);
        }

        $userRole = null;
        
        // Map idRol to string names for ease of use in middleware if needed
        // 1 = admin, 2 = cliente, 3 = agente
        $rolesMap = [
            1 => 'admin',
            2 => 'usuario', // user used 'usuario' in prompt, but DB has 'cliente'
            3 => 'agente'
        ];

        $userRoleId = $request->user()->idRol;
        $userRoleName = $rolesMap[$userRoleId] ?? 'unknown';

        if ($userRoleName !== $role) {
            return response()->json(['error' => 'Acceso no autorizado'], 403);
        }

        return $next($request);
    }
}
