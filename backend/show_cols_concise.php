<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

function showCols($table) {
    echo "Table: $table\n";
    $cols = DB::select("SHOW FULL COLUMNS FROM $table");
    foreach ($cols as $col) {
        echo "  - {$col->Field}: Type={$col->Type}, Collation={$col->Collation}, Null={$col->Null}, Key={$col->Key}\n";
    }
}

showCols('agentes');
echo "\n";
showCols('valoraciones_agentes');
