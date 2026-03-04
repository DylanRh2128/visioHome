<?php
$content = file_get_contents('backend/app/Http/Controllers/UsuarioController.php');
$lines = explode("\n", $content);
$balance = 0;
foreach ($lines as $i => $line) {
    $ln = $i + 1;
    $balance += substr_count($line, '{');
    $balance -= substr_count($line, '}');
    echo "L$ln [$balance]: $line\n";
    if ($ln > 65) break;
}
