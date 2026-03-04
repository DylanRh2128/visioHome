<?php

use Illuminate\Support\Facades\DB;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

function getFK($table) {
    $db = config('database.connections.mysql.database');
    return DB::select("
        SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME 
        FROM information_schema.KEY_COLUMN_USAGE 
        WHERE TABLE_SCHEMA = '$db' 
        AND TABLE_NAME = '$table' 
        AND REFERENCED_TABLE_NAME IS NOT NULL
    ");
}

echo "Constraints to Agentes:\n";
$tables = ['citas', 'valoraciones_agentes', 'pagos', 'comentarios_propiedad', 'propiedad_imagenes'];
foreach ($tables as $t) {
    if (Schema::hasTable($t)) {
        $fks = getFK($t);
        foreach ($fks as $fk) {
            if ($fk->REFERENCED_TABLE_NAME == 'agentes') {
                echo "Table: $t, Column: {$fk->COLUMN_NAME}, FK: {$fk->CONSTRAINT_NAME}\n";
            }
        }
    }
}
