<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

$cols = Illuminate\Support\Facades\DB::select('SHOW COLUMNS FROM agente_profiles');
file_put_contents('agente_profile_cols.txt', print_r($cols, true));
