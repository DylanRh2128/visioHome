<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;

$tables = ['usuarios', 'agente_profiles'];
$result = [];

foreach ($tables as $table) {
    if (Schema::hasTable($table)) {
        $result[$table] = Schema::getColumnListing($table);
    } else {
        $result[$table] = 'NOT FOUND';
    }
}

echo json_encode($result, JSON_PRETTY_PRINT);
