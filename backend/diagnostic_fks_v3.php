<?php
use Illuminate\Support\Facades\DB;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$db = config('database.connections.mysql.database');
$fks = DB::select("
    SELECT TABLE_NAME, CONSTRAINT_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = ?
    AND REFERENCED_TABLE_NAME = 'agentes'
", [$db]);

foreach ($fks as $fk) {
    echo "TABLE: {$fk->TABLE_NAME} | FK: {$fk->CONSTRAINT_NAME}\n";
}
