<?php
require '../db.php';
session_start();

$username='';
$score='';
$country='';

if ($_GET) {
    // Reference: https://medoo.in/api/where
    $player= $database->select("tb_players", "*", [
        "id_player" => $_GET["id"]
        
    ]);

    $username = $player[0]["username"];
    $score = $player[0]["score"];
    $country = $player[0]["country"];


    //var_dump($user);
}

if ($_POST) {
    // Reference: https://medoo.in/api/update
   
    $database->update("tb_players",[
        "username" => $_POST["username"],
        "country" => $_POST["country"],
        "score" => $_POST["score"],
    ],[
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
    <title>Actualizar Jugador</title>

</head>

<body>
    <h1>Actuarlizar jugador</h1>
    <form action="./editPlayer.php" method="POST">

        <!-- Chat Gpt Code: Promt: Como seria el formato para enviar a la base de datos un time, el usuario debe digitarlo -->

        <input type="text" name="username" value="<?php echo $username; ?>">
        <input type="text" name="score" value="<?php echo $score; ?>">
        <input type="text" name="country" value="<?php echo $country; ?>">

        <input type="hidden" name="id" value="<?php echo $player[0]["id_player"]; ?>">
     

        <input type="submit" value="Submit data">
    </form>
</body>

</html>