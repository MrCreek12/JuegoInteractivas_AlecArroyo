
import Menu from './Menu.js';
import Pause from './Pause.js';
import Level from './Level.Js';
import FinalScene from './FinalScene.js';



let config = {
  type: Phaser.AUTO,
    width: 1200,
    height: 720,
    scene: [
      Menu,
      //  constructor(key,cantVidas,itemScore,enemyScore,difficulty,jsonRoute,sceneNumber1,isLastLevel)
      
      new Level('Level1',3, 10, 10, 1,'./data/levelData.json',1,false),  
      new Level('Level2',3, 10, 10, 2,'./data/levelData2.json',2,false),
      new Level('Level3',3, 10, 10, 3,'./data/levelData.json',3,true),
     
      Pause,
      FinalScene,
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