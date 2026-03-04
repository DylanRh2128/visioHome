<?php
use Illuminate\Support\Facades\DB;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$db = config('database.connections.mysql.database');
echo "Database: $db\n";

$fks = DB::select("
    SELECT 
        TABLE_NAME, 
        COLUMN_NAME, 
        CONSTRAINT_NAME, 
        REFERENCED_TABLE_NAME, 
        REFERENCED_COLUMN_NAME
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = ?
    AND REFERENCED_TABLE_NAME IS NOT NULL
", [$db]);

echo "All Foreign Keys in $db:\n";
foreach ($fks as $fk) {
    echo "Table: {$fk->TABLE_NAME} | Column: {$fk->COLUMN_NAME} | FK: {$fk->CONSTRAINT_NAME} | References: {$fk->REFERENCED_TABLE_NAME}({$fk->REFERENCED_COLUMN_NAME})\n";
}
