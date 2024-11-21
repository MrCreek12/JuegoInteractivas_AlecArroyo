import Animations from './Animations.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key,) {
        
        super(scene, x, y, key);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        this.body.allowGravity = true;
        
         this.scene = scene;
        // Inicializamos las animaciones para este jugador
        this.animations = new Animations(scene);
        
        this.invulnerable=false;
        this.collide=false;

    }

    update(cursors) {
        // Verifica si la tecla derecha está presionada
        this.setVelocityX(0);

        if (cursors.right.isDown) {
        this.play('walk', true);
        this.setVelocityX(400);
        this.flipX = false; // Asegúrate de que el personaje mire a la derecha
        } else if (cursors.left.isDown) {
        this.play('walk', true);
        this.setVelocityX(-400);
        this.flipX = true; // Hacer que el personaje mire a la izquierda
        } else {
        this.play('static', true);
        }
        
        // Saltar
        if (cursors.up.isDown && this.body.touching.down) {
        this.setVelocityY(-1000); // Ajusta la fuerza del salto
        }
    }

}