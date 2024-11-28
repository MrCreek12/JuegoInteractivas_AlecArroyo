<?php 
    require '../db.php';
    $gameConfigs = $database->select('tb_game_config', '*');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Js-gameConfig</title>
    <a href="./add.php">Create Game Config</a>
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
    
</body>
</html>