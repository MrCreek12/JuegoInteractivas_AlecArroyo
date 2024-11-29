<?php 
    require '../db.php';
    $gameConfigs = $database->select('tb_game_config', '*');
    $sessions = $database->select('tb_tracking', '*');

    $players = $database->select('tb_players', ['id_player', 'username', 'country', 'score'], [
        'ORDER' => ['score' => 'DESC']
    ])
   

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Js-gameConfig</title>
    <a href="./add.php">Create Game Config</a>
    <a href="../index.html">Regresar a Landing page</a>
</head>
<body>
    <h1>Registered Game Configs</h1>
    <table border="1">
       <tr>
        <th>Id</th>
        <th>Created At</th>
        <th>Updated At</th>
        <th>Actions</th>
        <?php 
            foreach($gameConfigs as $gameConfig){
                echo "<tr>";
                echo "<td>{$gameConfig['id_game_config']}</td>";
                echo "<td>{$gameConfig['created_at']}</td>";
                echo "<td>{$gameConfig['updated_at']}</td>";
                echo "<td>
                        <a target='_blank' href='./api.php?id={$gameConfig['id_game_config']}'>View</a>
                        <a href='./edit.php?id={$gameConfig['id_game_config']}'>Edit</a>
                        <a href='./delete.php?id={$gameConfig['id_game_config']}'>Delete</a>
                    </td>";
                echo "</tr>";
            }
        ?>
    </tr> 
    </table>
    <h1>Registered Players</h1>
    <table border="1">
       <tr>
        <th>Id</th>
        <th>Player</th>
        <th>Score</th>
        <th>Country</th>
        <th>ACtions</th>

        <?php 
            foreach($players as $player){
                echo "<tr>";
                echo "<td>{$player['id_player']}</td>";
                echo "<td>{$player['username']}</td>";
                echo "<td>{$player['score']}</td>";
                echo "<td>{$player['country']}</td>";
                echo "<td>
                        <a href='./editPlayer.php?id={$player['id_player']}'>Edit</a>
                        <a href='./deletePlayer.php?id={$player['id_player']}'>Delete</a>
                    </td>";
                echo "</tr>";
            }
        ?>
    </tr> 
    </table>
    <h1>Registered Sessions</h1>
    <table border="1">
       <tr>
        <th>Id</th>
        <th>length</th>
        <th>Level</th>
        <th>Device type</th>
        <th>Screen size</th>
        <th>has closed</th>
        <th>date</th>
        <th>Actions</th>

        <?php 
            foreach($sessions as $session){
                echo "<tr>";
                echo "<td>{$session['id_tracking']}</td>";
                echo "<td>{$session['length']}</td>";
                echo "<td>{$session['level']}</td>";
                echo "<td>{$session['device_type']}</td>";
                echo "<td>{$session['screen_size']}</td>";
                echo "<td>{$session['has_closed_browser']}</td>";
                echo "<td>{$session['date']}</td>";
                echo "<td>
                        <a href='./deleteSession.php?id={$session['id_tracking']}'>Delete</a>
                    </td>";
                echo "</tr>";
            }
        ?>
    </tr> 
    </table>
    
</body>
</html>