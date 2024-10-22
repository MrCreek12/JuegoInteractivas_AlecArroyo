import Background from "./Background.js";
import Player from "./Player.js";
import Platform from "./Platform.js";
import Collectible from "./Collectible.js";
import Enemy from "./enemy.js";

class Main extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
    this.bg = null;
    this.fbg = null;
    this.Ariene = null
  }



  preload() {
    this.load.image('background', './game_assets/Background.png')
    this.load.image('frontBackground', './game_assets/FrontalBackground.png')
    this.load.image('MainGround', './game_assets/Main Ground.png')
    this.load.image('grPlatform', './game_assets/1x/Ground Platform.png')
    this.load.image('airPlatform', 'game_assets/1x/Air Platform 1.png')
    this.load.image('PowerUp', 'game_assets/1x/Power Up.png')

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

    this.levelData = this.cache.json.get('levelData');
    
    this.bg = new Background(this, 0, 0, 'background')

    this.cursors = this.input.keyboard.createCursorKeys();

    this.Ariene = new Player(this, this.levelData.player.x, this.levelData.player.y, 'idle', this.cursors)
    this.enemy = new Enemy(this, this.levelData.enemy.x, this.levelData.enemy.y, 'enemy-idle')

    this.createPlatforms();
    this.createCollectible();

    this.fbg = new Background(this, 0, 0, 'frontBackground')


    this.physics.add.collider([this.Ariene, this.enemy], this.platforms)
    this.cameras.main.startFollow(this.Ariene, true, 0.1, 0);
    this.cameras.main.setBounds(0, 0, this.bg.width / 1.75, this.bg.height / 1.75);


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
      let collectible = new Collectible(this, item.x, item.y, 'PowerUp');

      //enable physics
      this.add.existing(collectible, true);

      //play burning animatio

    });
  }

  update() {
    this.enemy.update()
    this.Ariene.update(this.cursors)

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
      debug: false
    }
  }


}




//create game and pass config

let game = new Phaser.Game(config);