<?php

$servername = "localhost";
$username = "mengisoft";
$password = "mengisoft";
$dbname = "diputacion_googlemaps";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM puntos";
$result = $conn->query($sql);

$puntos=array();
//$puntos[]="" .$row["id"].", " . $row["longitud"]. ", ". $row["latitud"]. ", ". $row["tipo"]. ", ".$row["nombre"];

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Coordenadas de ".$row["nombre"]." <img src='images/".$row["tipo"].".svg' width='20px' /> : " . $row["longitud"]. " " . $row["latitud"]. "<br>";
        $puntos=array( $row["id"],$row["longitud"],$row["latitud"],$row["tipo"],$row["nombre"]);
$puntos2=array(1,"".$row["longitud"]."",3);
    }
} else {
    echo "0 results";
}


var_dump($puntos);



$dato=$_REQUEST['q'];
//print_r($_REQUEST);

echo $dato."*".$puntos[$dato]." ".$puntos2[2]." longitud:  ".$puntos2[1];
$conn->close();
?> 