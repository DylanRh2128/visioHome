<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

echo "Dropping FKs...\n";
Schema::table('citas', function (Blueprint $table) {
    try {
        $table->dropForeign(['docAgente']);
        echo "Dropped FK on citas\n";
    } catch (\Exception $e) {}
});

Schema::table('valoraciones_agentes', function (Blueprint $table) {
    try {
        $table->dropForeign(['docAgente']);
        echo "Dropped FK on valoraciones_agentes\n";
    } catch (\Exception $e) {}
});

echo "Changing column type...\n";
Schema::table('agentes', function (Blueprint $table) {
    $table->string('docAgente', 20)->change();
});
echo "Changed agentes.docAgente to 20\n";

echo "Restoring FKs...\n";
Schema::table('citas', function (Blueprint $table) {
    try {
        $table->foreign('docAgente')->references('docAgente')->on('agentes')->onDelete('set null');
        echo "Restored FK on citas\n";
    } catch (\Exception $e) {
        echo "Failed to restore FK on citas: " . $e->getMessage() . "\n";
    }
});

Schema::table('valoraciones_agentes', function (Blueprint $table) {
    try {
        $table->foreign('docAgente')->references('docAgente')->on('agentes')->onDelete('cascade');
        echo "Restored FK on valoraciones_agentes\n";
    } catch (\Exception $e) {
        echo "Failed to restore FK on valoraciones_agentes: " . $e->getMessage() . "\n";
    }
});

echo "Finished.\n";
