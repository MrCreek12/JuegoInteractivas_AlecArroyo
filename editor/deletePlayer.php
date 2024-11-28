<?php 
    require '../db.php';
    if($_GET){
        // Reference: https://medoo.in/api/where
        $data = $database->select("tb_players","*",[
            "id_player"=> $_GET["id"]
        ]);
    }

    if($_POST){
        // Reference: https://medoo.in/api/delete
        $database->delete("tb_players",[
            "id_player"=>$_POST["id"]
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
    <h2>Se eliminará el siguiente jugador: (Esta accion es irreversible)</h2>
    <h3><?php echo $data[0]["username"]; ?></h3>
    <form action="./deletePlayer.php" method="POST">
        <input type="hidden" name="id" value="<?php echo $data[0]["id_player"]; ?>">
        <input type="submit" value="Yes">
        <input type="button" value="No" onclick="window.history.back()">
        
    </form>
</body>
</html>