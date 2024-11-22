import Animations from './Animations.js';
import Player from './Player.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key, leftLimit, rightLimit) {

        super(scene, x, y, key);
        this.scene = scene; // Asegúrate de asignar la escena aquí
        scene.add.existing(this);
        this.setScale(1.6);
        scene.physics.add.existing(this);
        this.body.setSize(63, 70);
        this.body.setOffset(10, 20);
        this.body.allowGravity = true;


        // Inicializamos las animaciones para este jugador
        this.animations = new Animations(scene);
        
        this.enemyCollide=false;
        // Dirección de movimiento
        this.direction = 1; // 1 = derecha, -1 = izquierda
        this.speed = 400;  // Velocidad del movimiento
        this.i = 0;
        // Límites de patrullaje pasados como parámetros
        this.limit =this.generarNumeroAleatorio();


    }


    update() {
        this.i++;
        if (this.i % this.limit === 0) {
            this.direction = this.direction * -1;
        }
        this.body.setVelocityX(this.direction * this.speed)
        // Detectar si el jugador está tocando el enemigo (colisión)

        //  Detectar si el jugador salta sobre el enemigo
        if (!this.scene.Ariene.body.touching.down) {
            this.scene.Ariene.invulnerable = true;
        } else if (this.scene.Ariene.body.touching.down && this.scene.Ariene.collide==true) {
            this.scene.Ariene.invulnerable = true;

           
        } else{
            this.scene.Ariene.invulnerable = false;
        }
        
        if (this.scene.Ariene.body.velocity.y > 0 &&
            this.scene.Ariene.body.touching.down &&
            this.body.touching.up) {

            this.processed = true; // Marca al enemigo como procesado    
            this.scene.score += 50; // Corrige aquí, usando `this.scene`    
            this.scene.scoreText.tintText(' #deff62  ', 1000);        
            this.destroyEnemy();
        }


    }

    // Método que restará una vida al jugador cuando el enemigo lo toque


    // Método para destruir al enemigo cuando el jugador salta sobre él
    destroyEnemy() {
        // Incrementa el puntaje
        this.destroy(); // Destruye el enemigo
    }

    generarNumeroAleatorio() {
        return Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    }

}