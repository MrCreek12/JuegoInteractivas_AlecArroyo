import Animations from './Animations.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key,) {
        super(scene, x, y, key);

        scene.add.existing(this);
        this.setScale(1.6);
        scene.physics.add.existing(this);

        this.body.allowGravity = true;
        

        // Inicializamos las animaciones para este jugador
        this.animations = new Animations(scene);

        

    }

    update() {
        

  
    }

}