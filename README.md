## VisioHome

Plataforma inmobiliaria monorepo que integra un backend en Laravel (PHP) y
un frontend moderno con Vite + React. Este README resume la arquitectura,
la estructura del proyecto y los pasos para ponerlo en marcha en desarrollo.

**Resumen rápido**

- Backend: Laravel (PHP) — API, modelos y lógica del servidor.
- Frontend: React + Vite — SPA para interacción y visualización.
- Base de datos: MySQL / MariaDB (dump en el repositorio).

**Arquitectura**

El repositorio está organizado como un monorepo con dos aplicaciones principales:

- `backend`: aplicación Laravel. Estructura clave:
	- [backend/app/Models](backend/app/Models) — modelos Eloquent
	- [backend/app/Http/Controllers](backend/app/Http/Controllers) — controladores
	- [backend/routes](backend/routes) — rutas `web.php` y `api.php`
	- [backend/public](backend/public) — entrada pública (index.php)
	- [backend/database/sql/visiohome.sql](backend/database/sql/visiohome.sql) — dump SQL

- `frontend`: aplicación frontend con Vite + React:
	- [frontend/src/main.jsx](frontend/src/main.jsx) — punto de entrada
	- [frontend/src/components](frontend/src/components) — componentes reutilizables
	- [frontend/src/pages](frontend/src/pages) — vistas / páginas
	- [frontend/src/services](frontend/src/services) — llamadas a API y utilidades

**Cómo ejecutar en desarrollo**

Prerequisitos: `PHP` (>=8), `Composer`, `Node` (>=16/18), `npm` o `pnpm`,
MySQL/MariaDB (o XAMPP) y extensiones PHP requeridas por Laravel.

1) Backend (Laravel)

```bash
cd backend
composer install
# Copiar o crear .env y configurar la base de datos
# en sistemas *nix: cp .env.example .env
# en PowerShell (Windows): Copy-Item .env.example .env
php artisan key:generate
# Importar dump SQL (ajusta usuario/BD):
# mysql -u root -p visiohome < database/sql/visiohome.sql
php artisan migrate --seed   # si hay migraciones y seeders
php artisan serve --host=127.0.0.1 --port=8000
```

2) Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
# Abrir: http://localhost:5173 (puerto por defecto de Vite)
```

3) Ejecutar tests (si aplica)

```bash
# Backend (desde la carpeta backend)
./vendor/bin/phpunit
# En Windows (si hay .bat): vendor\\bin\\phpunit.bat
```

**Base de datos**

- Dump SQL: [backend/database/sql/visiohome.sql](backend/database/sql/visiohome.sql)

**Notas operacionales**

- Asegúrate de que `backend/storage` y `backend/bootstrap/cache` sean escribibles
	por el usuario del servidor web.
- Ajusta las variables en `.env` (APP_URL, DB_*, MAIL_*, etc.).
- Si usas XAMPP, apunta el `DB_HOST` a `127.0.0.1` o `localhost` según convenga.

**Estructura rápida del repositorio**

- `backend/` — Laravel app (PHP)
- `frontend/` — Vite + React app
- `doc/` — diagramas y documentación (VisiHome.drawio)

**Siguientes pasos recomendados**

- Verificar y completar `.env` en `backend`.
- Importar `backend/database/sql/visiohome.sql` antes de iniciar la app.
- Ejecutar `npm install` en `frontend` y `composer install` en `backend`.

Si quieres, puedo: instalar dependencias, iniciar ambos servidores en tu
entorno actual o crear scripts `Makefile`/`composer.json` para simplificar
arranques. ¿Qué prefieres que haga ahora?
