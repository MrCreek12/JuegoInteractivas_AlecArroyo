
import Menu from './Menu.js';
import Pause from './Pause.js';
import Level from './Level.Js';

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    scene: [
      Menu,
      //  constructor(key,cantVidas,itemScore,enemyScore,difficulty,jsonRoute,sceneNumber1)
        
      new Level('Level1',3, 10, 10, 1,'./data/levelData2.json',1),
      new Level('Level2',1, 1, 1, 3,'./data/levelData.json',2),
     
      Pause,
    ],
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