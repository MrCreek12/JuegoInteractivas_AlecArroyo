<?php 
$errorMessage = ''; // Variable para el mensaje de error
require './db.php';

if($_GET){
    // Reference: https://medoo.in/api/where
    $score = $_GET["score"];
}

if (($_POST)) {
    date_default_timezone_set('America/Costa_Rica');
      
    
     
    $username = $_POST['username'];
    $score = $_POST['score'];
    $country = $_POST['country'];

    // Verificar si el usuario ya existe
    $existingUser = $database->get('tb_players', '*', [
        "username" => $username,
    ]);

    if ($existingUser) {
        $errorMessage = "El usuario ya existe. Por favor, elige otro nombre de usuario."; // Mensaje de error
    } else {
        $database->insert('tb_players', [
        "username" => $_POST['username'],
        // "password" => $_POST['password'],
        "score" => $_POST['score'],
        "country" => $_POST['country'],
    ]);

    }
     
}
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

        <div class="login-card ">
           
            <div class="flex justify-content">
                <img class="w70" src="imgs/MainLogo-2.png" alt="">
            </div>
            


            <form action="./register.php" method="POST">
                 <?php if ($errorMessage): ?>
                    <p style="font-size: 24px; color: red;"><?= $errorMessage ?></p>
                <?php endif; ?>
                <input type="text" name="username" class="search-field" placeholder="Usuario" style="color: white;">
                <input type="password" name="password" class="search-field" placeholder="Contraseña">
                <input type="text" name="score" class="search-field" style="width: 20%;" placeholder="Tu Puntaje" value="<?php echo $score; ?>">
                <input type="text" name="country" class="search-field" style="width: 20%;"  placeholder="Tu Pais">
                <input type="submit" class="logIn-btn" value="Registrarme">
            </form>
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