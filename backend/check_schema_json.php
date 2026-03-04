<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;

$tables = ['agentes', 'usuarios', 'valoraciones_agentes', 'personal_access_tokens', 'citas'];
$results = [];

foreach ($tables as $table) {
    if (Schema::hasTable($table)) {
        $cols = [];
        foreach (Schema::getColumnListing($table) as $column) {
            $cols[$column] = Schema::getColumnType($table, $column);
        }
        $results[$table] = $cols;
    } else {
        $results[$table] = "(Not found)";
    }
}

file_put_contents('schema_info.json', json_encode($results, JSON_PRETTY_PRINT));
echo "Schema info saved to schema_info.json\n";
