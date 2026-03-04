<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

echo "Table: usuarios\n";
$res = DB::select("SHOW COLUMNS FROM usuarios");
foreach($res as $r) echo "- " . $r->Field . " (" . $r->Type . ")\n";

echo "\nTable: agente_profiles\n";
$res2 = DB::select("SHOW COLUMNS FROM agente_profiles");
foreach($res2 as $r) echo "- " . $r->Field . " (" . $r->Type . ")\n";
