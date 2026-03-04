<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

$fks = DB::select("
    SELECT TABLE_NAME, CONSTRAINT_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE REFERENCED_TABLE_NAME = 'agentes'
    AND TABLE_SCHEMA = DATABASE()
");

foreach ($fks as $fk) {
    echo "Dropping FK {$fk->CONSTRAINT_NAME} on {$fk->TABLE_NAME}...\n";
    try {
        DB::statement("ALTER TABLE {$fk->TABLE_NAME} DROP FOREIGN KEY {$fk->CONSTRAINT_NAME}");
    } catch (\Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

echo "Standardizing agentes.docAgente...\n";
DB::statement("ALTER TABLE agentes MODIFY docAgente VARCHAR(20)");

echo "Restoring FKs...\n";
foreach ($fks as $fk) {
    echo "Restoring FK on {$fk->TABLE_NAME}...\n";
    try {
        $onDelete = ($fk->TABLE_NAME == 'citas') ? 'SET NULL' : 'CASCADE';
        $col = ($fk->TABLE_NAME == 'citas') ? 'docAgente' : 'docAgente'; // it's docAgente for both
        DB::statement("ALTER TABLE {$fk->TABLE_NAME} ADD CONSTRAINT {$fk->CONSTRAINT_NAME} FOREIGN KEY (docAgente) REFERENCES agentes(docAgente) ON DELETE $onDelete");
        echo "Restored.\n";
    } catch (\Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
    }
}

echo "Done.\n";
