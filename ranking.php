<?php 

require './db.php';

$players = $database->select('tb_players', ['id_player', 'username', 'country', 'score'], [
    'ORDER' => ['score' => 'DESC']
])
?>

<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login - Ariene - Pesadillas a Domicilio</title>

    <link rel="stylesheet" href="css/main.css">
    <meta name="description" content="">

    <meta property="og:title" content="">
    <meta property="og:type" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <meta property="og:image:alt" content="">

    <link rel="icon" href="favicon.png" type="image/png">


    <link rel="manifest" href="site.webmanifest">
    <meta name="theme-color" content="#fafafa">
    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/nickainley" rel="stylesheet">
    <link href="https://fonts.cdnfonts.com/css/labor-union" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Kadwa:wght@400;700&display=swap" rel="stylesheet">



    <!-- fonts -->
</head>

<body>

    <!-- login section -->
    <section class="login-section text-center text-white flex justify-content">
         
        <div class="login-card" >
           <h2>RANKING</h2>

        <table >
    <thead>
        <tr>
            <th>#</th>
            <th>User</th>
            <th>Score</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        <?php
        // Imprimir los jugadores en la tabla
        $rank = 1;
        foreach ($players as $player) {
            echo "<tr>
                    <td>" . $rank++ . "</td>
                    <td>" . htmlspecialchars($player['username']) . "</td>
                    <td>" . htmlspecialchars($player['score']) . "</td>
                    <td>" . htmlspecialchars($player['country']) . "</td>
                  </tr>";
        }
        ?>
                 </tbody>
            </table>
        </div>


    </section>

    <!-- footer -->
    <footer class="footer-content text-dark auto">
        <div class="columns-container">
            <div>
                <h4 class="footer-title">ABOUT</h4>
                <p class="about-description">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                    nibh
                    euismod tincid</p>
            </div>
            <div>
                <div class="columns-container text-center">
                    <div>
                        <h4 class="footer-title text-center">MENU</h4>
                        <ul class="footer-list">
                            <li class="footer-list-item"><a href="#" class="footer-link">TEAM</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">JOIN US</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">CAREERS</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">GOALS</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="footer-title text-center">INFORMATION</h4>
                        <ul class="footer-list">
                            <li class="footer-list-item"><a href="#" class="footer-link">TEAM</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">JOIN US</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">CAREERS</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">GOALS</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="footer-title text-center">LEGAL</h4>
                        <ul class="footer-list">
                            <li class="footer-list-item"><a href="#" class="footer-link">TEAM</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">JOIN US</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">CAREERS</a></li>
                            <li class="footer-list-item"><a href="#" class="footer-link">GOALS</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </footer>
    <!-- footer -->
    <script src="./js/app.js"></script>
</body>

</html>