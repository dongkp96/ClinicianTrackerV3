<?php

$dsn ="mysql:host=localhost; dbname=cosc630kd";
$dbusername = "COSC630KD";
$dbpassword = "906524Ram!";

try{
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){
    echo "Connection Failed" . $e->getMessage();
}