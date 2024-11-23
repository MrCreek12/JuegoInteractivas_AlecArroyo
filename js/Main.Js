import Background from "./Background.js";
import Player from "./Player.js";
import Platform from "./Platform.js";
import Collectible from "./Collectible.js";
import Enemy from "./enemy.js";
import CollisionManager from "./CollisionManajer.js";
import Text from "./Text.js";

export default class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
    this.bg = null;
    this.fbg = null;
    this.Ariene = null
    this.score = 0;  // Variable de puntaje, comienza en 0
    this.scoreText = null;  // Definir la propiedad de scoreText
    this.countText = 4;  // Definir la propiedad de scoreText
    this.count = 0;  // Definir la propiedad de scoreText
    this.gameOvertext = null;
    this.winText = null;
    this.lives = []; // Array para guardar los sprites de las vidas
    this.collisionManager = null;
    this.invetoryX = 20;

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

    this.load.json('levelData', './data/levelData.json');
  };


  create() {
    this.collisionManager = new CollisionManager(this);
    this.enemies = this.physics.add.group();
    this.levelData = this.cache.json.get('levelData');

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
        let collectible = new Collectible(this, item.x, item.y, item.key, this.Ariene, item.type);
        this.add.existing(collectible, true);

      }

      if (item.type == 2) {
        let collectible = new Collectible(this, item.x, item.y, item.key, this.Ariene, item.type);
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
        let enemy = new Enemy(this, item.x, item.y, 'enemy-idle', item.speed, item.type);  // Crear una instancia de Enemy
        this.physics.add.collider(this.Ariene, enemy, (player, enemy) => this.collisionManager.hitPlayer(player, enemy), null, this);
        this.enemies.add(enemy);  // Añadir el enemigo al grupo de enemigos
      }
      
      if (item.type == 2) {
        let enemy = new Enemy(this, item.x, item.y, 'enemy-idle', item.speed, item.type);  // Crear una instancia de Enemy
        this.physics.add.collider(this.Ariene, enemy, (player, enemy) => this.collisionManager.hitPlayer(player, enemy), null, this);
        this.enemies.add(enemy);  // Añadir el enemigo al grupo de enemigos
      }

     


    });
  }


  createText() {
    this.scoreText = new Text(this, 'Puntaje', 10, 10);
    this.scoreText.setDynamicValue(this.score, 'Puntaje:');

    this.gameOverText = new Text(this, 'Game Over', 500, 150);
    this.gameOverText.setVisible(false);
    this.gameOverText.setFontSize('64px');

    this.countText = new Text(this, '/4',540, 10);
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
      this.scene.pause();
      this.scene.launch('Pause'); // Lanza la escena de pausa
     
      
    });
  }
  createLives() {
    const livesCount = 3; // Cantidad de vidas
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
    this.countText.updateValueInverse(this.count, '/4');
  }

  gameOver() {
    this.physics.pause();
    // Mostrar un texto de "Game Over"
    this.gameOverText.setVisible(true);
    this.input.keyboard.enabled = false;

    this.time.delayedCall(3000, () => {
      this.scene.restart(); // Reinicia la escena después de 3 segundos
      this.input.keyboard.enabled = true;
      this.score = 0;
      this.count = 0;
      this.invetoryX = 20;


    });
  }


  winGame() {
    // Pausa el juego
    this.physics.pause();

    // Mostrar mensaje de victoria
    this.winText.setVisible(true);
    // Reinicia el juego después de un tiempo o realiza otras acciones
    this.time.delayedCall(3000, () => {
      this.scene.restart(); // Reinicia la escena
      this.count = 0;
      this.score = 0; // Reinicia el puntaje si es necesario
      this.invetoryX = 20;
    });

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
    
    console.log(`Coordenadas: X=${this.Ariene.getCoordinatesX()}, Y=${this.Ariene.getCoordinatesY()}`);

  }



}//fin de la clase main
