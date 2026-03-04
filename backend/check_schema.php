<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

try {
    $tables = DB::select('SHOW TABLES');
    foreach ($tables as $table) {
        $tableName = array_values((array)$table)[0];
        echo "\nTable: $tableName\n";
        $columns = DB::select("DESCRIBE $tableName");
        foreach ($columns as $col) {
            echo "  - {$col->Field} ({$col->Type})\n";
        }
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
