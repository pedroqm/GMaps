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
        /*echo "id: " . $row["id"]. " - Coordenadas de ".$row["nombre"]." <img src='images/".$row["tipo"].".svg' width='20px' /> : " . $row["longitud"]. " " . $row["latitud"]. "<br>";*/
        
     
        $puntos[] = array ("id"=>array ($row["id"]),
    "longitud"=>array ($row["longitud"]),
    "latitud" => array ($row["latitud"]),
    "nombre" => array ($row["nombre"]),
    "tipo" => array ($row["tipo"])
                                  );
     
        
      
    }
} else {
    echo "0 results";
}



$dato=$_REQUEST['q'];
//print_r($_REQUEST);

echo json_encode($puntos,JSON_UNESCAPED_UNICODE);



if($_POST['nombre']){
    
    
    $nombre= $_POST['nombre'];
    $longitud= $_POST['longitud'];
    $latitud= $_POST['latitud'];
    $tipo= $_POST['tipo'];
    
    $insertarPunto="INSERT INTO puntos(nombre,longitud,latitud,tipo) VALUES ('".$nombre."','".$longitud."','".$latitud."','".$tipo."')";

    
    if ( $conn->query($insertarPunto) === TRUE) {
    echo "New records created successfully";
} else {
    echo "Error: " . $insertarPunto . "<br>" . $conn->error;
}
}
          

$conn->close();

    ?> 