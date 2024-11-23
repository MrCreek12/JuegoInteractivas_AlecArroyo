
import Menu from './Menu.js';
import Pause from './Pause.js';
import Main from './Main.Js';

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 720,
    scene: [Menu, Main, Pause],
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