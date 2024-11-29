import Background from "./Background.js";
import Player from "./Player.js";
import Platform from "./Platform.js";
import Collectible from "./Collectible.js";
import Enemy from "./enemy.js";
import CollisionManager from "./CollisionManajer.js";
import Text from "./Text.js";


export default class Level extends Phaser.Scene {
  constructor(key, cantVidas, itemScore, enemyScore, difficulty, jsonRoute, sceneNumber, isLastLevel) {
    super({ key: key });
    this.bg = null;
    this.fbg = null;
    this.Ariene = null


    this.score = 0;  // Variable de puntaje, comienza en 0
    this.countBlueKeys = 0;
    this.countRedKeys = 0;
    this.countYellowKeys = 0;

    this.count = 0;  // Definir la propiedad de scoreText

    this.cantVidas = cantVidas;
    this.totalEnemigos = null;

    this.itemScore = itemScore;
    this.enemyScore = enemyScore;
    this.jsonRoute = jsonRoute
    this.sceneNumber = sceneNumber
   
    this.elapsedTime = null;
    this.windowClosed = "No";

    this.scoreText = null;  // Definir la propiedad de scoreText

    this.gameOvertext = null;
    this.winText = null;
    this.lives = []; // Array para guardar los sprites de las vidas

    this.collisionManager = null;
    this.invetoryX = 20;
    this.difficulty = difficulty;
    this.isLastLevel = isLastLevel
  }



  preload() {
    this.load.image('background', './game_assets/Background.png')
    this.load.image('background2', './game_assets/2.png')
    this.load.image('frontBackground', './game_assets/FrontalBackground-1-min.png')
    this.load.image('frontBackground2', './game_assets/FrontalBackground-2-min.png')

    this.load.image('MainGround', './game_assets/Main Ground.png')
    this.load.image('grPlatform', './game_assets/1x/Ground Platform.png')
    this.load.image('airPlatform', 'game_assets/1x/Air Platform 1.png')
    this.load.image('PowerUp', 'game_assets/1x/Power Up.png')
    this.load.image('blueHeart', './game_assets/blue-heart.png')
    this.load.image('red-key', './game_assets/red-key.png')
    this.load.image('blue-key', './game_assets/blue-key.png')
    this.load.image('yellow-key', './game_assets/yellow-key.png')
    this.load.image('icon', './game_assets/jibble icon.png')

      / this.load.image('pause boton', './game_assets/Boton Pausa.png')

    this.load.spritesheet('idle', './game_assets/idle-small.png', {
      frameWidth: 78,
      frameHeight: 152,


    })

    this.load.spritesheet('Walking', './game_assets/walking-small.png', {
      frameWidth: 78,
      frameHeight: 152,

    })

    this.load.image('enemy-idle', './game_assets/enemy-image.png');
    //Permite que los datos no se sobreescriban
    this.load.json('level1-data', 'http://juego-interactivas.test/DesarrolloDeAplicacionesInteractivas_ProyectoVidejuego_AlecArroyo/editor/api.php?id=1');
    this.load.json('level2-data', 'http://juego-interactivas.test/DesarrolloDeAplicacionesInteractivas_ProyectoVidejuego_AlecArroyo/editor/api.php?id=2');
    this.load.json('level3-data', 'http://juego-interactivas.test/DesarrolloDeAplicacionesInteractivas_ProyectoVidejuego_AlecArroyo/editor/api.php?id=3');
  };

  init() {
    this.invetoryX = 20;
    this.windowClosed = "No";
    if (this.sceneNumber == 1) {
      this.score = 0;
      this.countBlueKeys = 0;
      this.countRedKeys = 0;
      this.countYellowKeys = 0;
    }
  }



  create() {
    // this.score = 0;
    window.addEventListener('beforeunload', () => {
       this.windowClosed = "Si"; // Indica que la ventana se está cerrando
      
      // Enviar al servidor
        this.sendData();
    });
    this.setTimer();
    this.count = 0;  // Definir la propiedad de scoreText
    this.lives = []; // Array para guardar los sprites de las vidas
    this.input.keyboard.enabled = true;


    this.collisionManager = new CollisionManager(this);
    this.enemies = this.physics.add.group();

    this.levelData = this.cache.json.get('level' + this.sceneNumber + '-data');

    this.bg = new Background(this, 0, 0, 'background')
    this.bg2 = new Background(this, 1222, 0, 'background2')
    this.bg3 = new Background(this, 2232, 0, 'background2')
    this.cursors = this.input.keyboard.createCursorKeys();

    this.Ariene = new Player(this, this.levelData.player.x, this.levelData.player.y, 'idle', this.cursors)

    this.createPlatforms();
    this.createCollectible();

    this.createEnemies();
    this.fbg2 = new Background(this, 2000, 0, 'frontBackground2')
    this.fbg = new Background(this, 0, 0, 'frontBackground')
    this.icon = new Background(this, 650, 10, 'icon')
    this.icon.setScrollFactor(0);
    this.icon.setAlpha(0.5);

    this.physics.add.collider([this.Ariene, this.enemies], this.platforms)
    this.cameras.main.startFollow(this.Ariene, true, 0.1, 0);
    this.cameras.main.setBounds(0, 0, 3000, this.bg.height / 1);

    this.createText();
    this.createLives();
    this.createPauseButton();




  }


  createPlatforms() {


    // Create platforms
    this.platforms = this.physics.add.staticGroup();

    this.levelData.platforms.forEach((item) => {
      let platform;

      if (item.tiles == 1) {

        platform = new Platform(this, item.x, item.y, item.key)

      }
    });

  }


  createCollectible() {


    this.levelData.PowerUps.forEach((item) => {
      if (item.type == 1) {
        let collectible = new Collectible(this, item.x, item.y, item.key, this.Ariene, item.type, this.itemScore);
        this.add.existing(collectible, true);

      }

      if (item.type == 2) {
        let collectible = new Collectible(this, item.x, item.y, item.key, this.Ariene, item.type, this.itemScore);
        this.add.existing(collectible, true);
      }


      //enable physics

      //play burning animatio

    });
  }

  createEnemies() {
    // Crear enemigos a partir de los datos de nivel
    this.levelData.enemy.forEach((item) => {
      if (item.type == 1) {
        let enemy = new Enemy(this, item.x, item.y, 'enemy-idle', item.speed, item.type, this.enemyScore, this.difficulty);  // Crear una instancia de Enemy
        this.physics.add.collider(this.Ariene, enemy, (player, enemy) => this.collisionManager.hitPlayer(player, enemy), null, this);
        this.enemies.add(enemy);  // Añadir el enemigo al grupo de enemigos
      }

      if (item.type == 2) {
        let enemy = new Enemy(this, item.x, item.y, 'enemy-idle', item.speed, item.type, this.enemyScore, this.difficulty);  // Crear una instancia de Enemy
        this.physics.add.collider(this.Ariene, enemy, (player, enemy) => this.collisionManager.hitPlayer(player, enemy), null, this);
        this.enemies.add(enemy);  // Añadir el enemigo al grupo de enemigos
      }




    });

    this.totalEnemigos = '/' + this.enemies.getLength();
  }


  createText() {
    this.levelText = new Text(this, 'Nivel' + ' ' + this.sceneNumber, 500, 200);
    this.levelText.setAlpha(0.3);
    this.levelText.setFontSize('70px');
    this.levelText.setScrollFactor(1);

    this.scoreText = new Text(this, 'Puntaje', 10, 10);
    this.scoreText.setDynamicValue(this.score, 'Puntaje:');

    this.gameOverText = new Text(this, 'Game Over', 500, 150);
    this.gameOverText.setVisible(false);
    this.gameOverText.setFontSize('64px');

    this.countText = new Text(this, '/2', 540, 10);
    this.countText.setFontSize('40px');
    this.countText.setDynamicValueInverse(this.count, '0');


    this.winText = new Text(this, '¡Ganaste!', 500, 150);
    this.winText.setVisible(false);
    this.winText.setColor('#d2ff2d');
    this.winText.setFontSize('64px');

  }

  createPauseButton() {
    const pauseButton = this.add.image(1100, 50, 'pause boton').setScale(0.8);
    pauseButton.setScrollFactor(0); // Hacer que el corazón sea estático
    pauseButton.setInteractive();


    pauseButton.on('pointerover', () => {
      pauseButton.setScale(1);

    });

    pauseButton.on('pointerout', () => {
      pauseButton.setScale(0.8); // Restaurar el tamaño original
    });


    pauseButton.on('pointerdown', () => {
      this.scene.pause(this.scene.key);
      this.scene.launch('Pause', { previousScene: this.scene.key }); // Lanza la escena de pausa


    });
  }
  createLives() {
    const livesCount = this.cantVidas; // Cantidad de vidas
    const startX = 190; // Posición inicial (ajústalo según el tamaño de tu juego)
    const startY = 100; // Posición en Y

    for (let i = 0; i < livesCount; i++) {
      const heart = this.add.image(startX - i * 70, startY, 'blueHeart').setScale(0.5); // Escalar si es necesario
      heart.setScrollFactor(0); // Hacer que el corazón sea estático
      this.lives.push(heart); // Guardar en el array de vidas
    }
  }

  loseLife() {
    if (this.lives.length > 0) {
      const lostHeart = this.lives.pop();
      lostHeart.destroy();
    }
    if (this.lives.length === 0) {
      this.gameOver();
      console.log("Game Over");
    }
  }

  updateScoreDisplay() {
    this.scoreText.updateValue(this.score, 'Puntaje:');

    this.countText.updateValueInverse(this.count, this.totalEnemigos);
  }

  gameOver() {
    this.physics.pause();
    // Mostrar un texto de "Game Over"
    this.gameOverText.setVisible(true);
    this.input.keyboard.enabled = false;
    this.sendData();

    this.time.delayedCall(3000, () => {
       this.scene.restart(); // Reinicia la escena después de 3 segundos
      this.input.keyboard.enabled = true;

      if (this.sceneNumber == 1) {

        this.score = 0;
      } else {
        this.score = this.scene.get('Level' + (this.sceneNumber - 1)).getScore();
      }

      this.count = 0;
      this.invetoryX = 20;


    });
  }


  winGame() {
    this.sendData();
    // Pausa el juego
    this.physics.pause();
    // this.scene.get('Level' + (a + b)).setScore(this.score);
    if (this.isLastLevel == false) {
      this.sce

      this.winText.setVisible(true);
      // Reinicia el juego después de un tiempo o realiza otras acciones
      this.time.delayedCall(3000, () => {
        let a = this.sceneNumber;
        let b = 1;

        //Normal Level
        this.scene.start('Level' + (a + b));
        this.scene.get('Level' + (a + b)).setScore(this.score);
        this.scene.get('Level' + (a + b)).setBlueKeys(this.countBlueKeys);
        this.scene.get('Level' + (a + b)).setRedKeys(this.countRedKeys);
        this.scene.get('Level' + (a + b)).setYellowKeys(this.countYellowKeys);

        //Debugging


        // this.scene.restart(); // Reinicia la escena
        // this.count = 0;
        // this.score = 0; // Reinicia el puntaje si es necesario
        // this.invetoryX = 20;
      });
    } else if (this.isLastLevel == true) {
      this.scene.start('FinalScene');
      this.scene.get('FinalScene').setLastScene(this.scene.key);
    }
    // Mostrar mensaje de victoria


  }

  //Setter y getter
  setBlueKeys(count) {
    this.countBlueKeys = count;
  }
  setRedKeys(count) {
    this.countRedKeys = count;
  }
  setYellowKeys(count) {
    this.countYellowKeys = count;
  }

  getBlueKeys() {
    return this.countBlueKeys;
  }
  getRedKeys() {

    return this.countRedKeys;
  }
  getYellowKeys() {
    return this.countYellowKeys;
    // return this.countYellowKeys;
  }


  setScore(score) {
    this.score = score;
  }
  getScore() {

    // return this.score;

    //Debugging (Quitar)
    return this.score;
  }

  sendData() {
    fetch('http://juego-interactivas.test/DesarrolloDeAplicacionesInteractivas_ProyectoVidejuego_AlecArroyo/tracking.php', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "browser": navigator.userAgent,"screen": screen.width + "x" + screen.height, "length": this.elapsedTime, "level":this.sceneNumber,"closed":this.windowClosed }),
      keepalive: true
    })
    .then(response => response.text())  // Log the raw response as text first
    .then(text => {
      console.log('Response Text:', text);  // Inspect the raw response
      try {
        const data = JSON.parse(text);  // Try parsing it
        console.log(data);  // If parsing succeeds, log the JSON
      } catch (e) {
        console.error('Error:', e);
        // Alert message for parsing errors, but continue execution
      }
    })
    .catch(error => {
      console.error('Network or other error:', error);  // Catch network or other errors
      // Optional: Show an alert for network errors without crashing
      // alert('Hubo un error de red. Por favor, inténtalo de nuevo.');
    });
  }

  setTimer() {
    this.elapsedTime = 0;

    // Crear un texto que se actualizará con el tiempo
    // Crear un evento que se dispara cada segundo
    this.time.addEvent({
      delay: 1000, // 1000ms = 1 segundo
      callback: this.updateTimer,
      callbackScope: this,
      loop: true // Repetir el evento cada segundo
    });
  }
  

  updateTimer() {
    this.elapsedTime += 1; // Incrementa el contador en 1 segundo
  }

  
  


  update() {
    if (this.enemies.getLength() === 0) {
      this.winGame();
    }

    this.enemies.children.iterate((enemy) => {
      // Puedes agregar lógica adicional para cada enemigo, si es necesario
      if (enemy) { // Asegúrate de que "enemy" no sea undefined
        enemy.update();
      } // Aunque `runChildUpdate: true` lo hace automáticamente
    });
    this.Ariene.update(this.cursors)
    this.updateScoreDisplay()

    // console.log(`Coordenadas: X=${this.Ariene.getCoordinatesX()}, Y=${this.Ariene.getCoordinatesY()}`);

  }



}//fin de la clase main
