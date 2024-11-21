import Background from "./Background.js";
import Player from "./Player.js";
import Platform from "./Platform.js";
import Collectible from "./Collectible.js";
import Enemy from "./enemy.js";
import CollisionManager from "./CollisionManajer.js";

class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
    this.bg = null;
    this.fbg = null;
    this.Ariene = null
    this.score = 0;  // Variable de puntaje, comienza en 0
    this.scoreText = null;  // Definir la propiedad de scoreText
    this.lives = []; // Array para guardar los sprites de las vidas
    this.collisionManager = null;

  }



  preload() {
    this.load.image('background', './game_assets/Background.png')
    this.load.image('frontBackground', './game_assets/FrontalBackground.png')
    this.load.image('MainGround', './game_assets/Main Ground.png')
    this.load.image('grPlatform', './game_assets/1x/Ground Platform.png')
    this.load.image('airPlatform', 'game_assets/1x/Air Platform 1.png')
    this.load.image('PowerUp', 'game_assets/1x/Power Up.png')
    this.load.image('blueHeart', './game_assets/blue-heart.png')
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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.Ariene = new Player(this, this.levelData.player.x, this.levelData.player.y, 'idle', this.cursors)

    this.createPlatforms();
    this.createCollectible();



    this.fbg = new Background(this, 0, 0, 'frontBackground')

    this.createEnemies();

    this.physics.add.collider([this.Ariene, this.enemies], this.platforms)
    this.cameras.main.startFollow(this.Ariene, true, 0.1, 0);
    this.cameras.main.setBounds(0, 0, this.bg.width / 1.75, this.bg.height / 1.75);

    this.createScoreText();
    this.createLives();



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
      let collectible = new Collectible(this, item.x, item.y, 'PowerUp', this.Ariene);

      //enable physics
      this.add.existing(collectible, true);

      //play burning animatio

    });
  }

  createEnemies() {
    // Crear enemigos a partir de los datos de nivel
    this.levelData.enemy.forEach((item) => {
      let enemy = new Enemy(this, item.x, item.y, 'enemy-idle', item.leftLimit, item.rightLimit);  // Crear una instancia de Enemy
      this.physics.add.overlap(this.Ariene, enemy, (player, enemy) => this.collisionManager.hitPlayer(player, enemy), null, this);
      this.enemies.add(enemy);  // Añadir el enemigo al grupo de enemigos
     

    });
  }


  createScoreText() {
    this.scoreText = this.add.text(10, 10, `Puntaje: ${this.score}`, { fontSize: '32px', fill: '#fff' });
    this.scoreText.setScrollFactor(0);  // Esto asegura que el puntaje sea estático en la pantalla


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
      const lostHeart = this.lives.pop(); // Eliminar una vida
      lostHeart.destroy(); // Quitar el sprite de la pantalla
    }
    if (this.lives.length === 0) {
      console.log("Game Over");
      // Aquí puedes manejar la lógica de fin del juego
    }
  }

  // Esta función actualizará el texto con el puntaje actual
  updateScoreDisplay() {
    if (this.scoreText) {
      this.scoreText.setText(`Puntaje: ${this.score}`);
    }
    if (this.liveText) {
      this.liveText.setText(`vida: ${this.liveText}`);
    }
  }


  update() {
    this.enemies.children.iterate((enemy) => {
      // Puedes agregar lógica adicional para cada enemigo, si es necesario
      if (enemy) { // Asegúrate de que "enemy" no sea undefined
        enemy.update();
      } // Aunque `runChildUpdate: true` lo hace automáticamente
    });
    this.Ariene.update(this.cursors)
    this.updateScoreDisplay()
  }



}//fin de la clase main

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 720,
  scene: Main,
  title: 'Interactivas - Game',
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 2000 },
      debug: true
    }
  }


}




//create game and pass config

let game = new Phaser.Game(config);