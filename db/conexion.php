<?php

$server="localhost";
$user="root";   
$pass="";
$bd="visiohome";

$conexion=mysqli_connect($server,$user,$pass,$bd);

if(!$conexion){
    die("Conexion fallida: ".mysqli_connect_error());
}
echo"Conexion exitosa";