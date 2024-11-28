
<?php

$name = "John";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello <?php echo $name ?></h1>
    <form action="./response.php" method="POST">
        <input type="text" name="name">
        <button type="submit">Submit</button>
    </form>
</body>
</html>