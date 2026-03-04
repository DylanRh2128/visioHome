<?php
use Illuminate\Support\Facades\DB;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$db = config('database.connections.mysql.database');
$tables = DB::select("SHOW TABLES");
echo "Tables in $db:\n";
foreach ($tables as $table) {
    foreach ($table as $key => $value) {
        echo "- $value\n";
    }
}
