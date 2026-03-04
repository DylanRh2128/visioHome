<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

foreach (['agentes', 'valoraciones_agentes', 'usuarios', 'citas'] as $table) {
    if (Schema::hasTable($table)) {
        $cols = DB::select("SHOW FULL COLUMNS FROM $table WHERE Field = 'docAgente'");
        if (count($cols) > 0) {
            $col = $cols[0];
            echo "$table.docAgente: Type={$col->Type}, Collation={$col->Collation}\n";
        } else {
            // For usuarios it is docUsuario
            $cols = DB::select("SHOW FULL COLUMNS FROM $table WHERE Field = 'docUsuario'");
            if (count($cols) > 0) {
                $col = $cols[0];
                echo "$table.docUsuario: Type={$col->Type}, Collation={$col->Collation}\n";
            }
        }
    }
}
