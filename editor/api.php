<?php 
    require '../db.php';
    if(isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        $data= json_decode(file_get_contents('php://input'),true);
        var_dump($data);
    }
    
    if($_GET){
        $data = $database->select("tb_game_config","*",[
            "id_game_config" => $_GET["id"]
        ]);
    }

    $response=$data[0]['game_data'];
    // echo $response;

    $response = json_decode($response, true);


    echo json_encode($response, JSON_PRETTY_PRINT);
?>