<?php 
ini_set('display_errors', 0); // Desactivar la visualización de errores
error_reporting(E_ALL); // Asegurarse de que todos los errores se registren

$errorMessage = ''; // Variable para el mensaje de error
require './db.php';
if(isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
  date_default_timezone_set('America/Costa_Rica');
   
  $data= json_decode(file_get_contents('php://input'),true);
    
     $database->insert('tb_tracking', [
      "length" => $data['length'],
      "level" => $data['level'],
      "device_type" => $data['browser'],
      "screen_size" => $data['screen'],
      "has_closed_browser" => $data['closed'],
      "date" => date('Y-m-d H:i:s'),
  ]); // Aquí faltaba el punto y coma
}
?>
