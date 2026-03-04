<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

$res = DB::select("
    SELECT COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME, COLUMN_TYPE
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'agentes'
    AND COLUMN_NAME = 'docAgente'
");
print_r($res);

$res2 = DB::select("
    SELECT COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME, COLUMN_TYPE
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'valoraciones_agentes'
    AND COLUMN_NAME = 'docAgente'
");
print_r($res2);
