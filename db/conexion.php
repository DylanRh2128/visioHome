<?php

$server="localhost";
$user="root";   
$pass="";
$bd="visiohome";

$conn=mysqli_connect($server,$user,$pass,$bd);

if(!$conn){
    die("Conexion fallida: ".mysqli_connect_error());
}
echo"Conexion exitosa";