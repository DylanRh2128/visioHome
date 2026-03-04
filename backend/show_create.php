<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

foreach (['citas', 'valoraciones_agentes'] as $table) {
    if (Schema::hasTable($table)) {
        $res = DB::select("SHOW CREATE TABLE $table");
        echo "Table: $table\n";
        print_r($res[0]);
        echo "\n";
    }
}
