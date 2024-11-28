<?php 
    require '../db.php';
    if($_GET){
        // Reference: https://medoo.in/api/where
        $data = $database->select("tb_game_config","*",[
            "id_game_config"=> $_GET["id"]
        ]);
    }

    if($_POST){
        // Reference: https://medoo.in/api/delete
        $database->delete("tb_game_config",[
            "id_game_config"=>$_POST["id"]
        ]);

        header("Location: ./index.php");
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Are you sure you want to delete this reserva?</h2>
    <h3><?php echo $data[0]["id_game_config"]; ?></h3>
    <form action="./delete.php" method="POST">
        <input type="hidden" name="id" value="<?php echo $data[0]["id_game_config"]; ?>">
        <input type="submit" value="Yes">
        <input type="button" value="No" onclick="window.history.back()">
        
    </form>
</body>
</html>