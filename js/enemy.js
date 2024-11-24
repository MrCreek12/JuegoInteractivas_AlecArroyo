import Animations from './Animations.js';
import Player from './Player.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key, speed, type, enemyScore, difficulty) {

        super(scene, x, y, key);

        this.scene = scene; // Asegúrate de asignar la escena aquí
        scene.add.existing(this);

        //Configuracion del enemigo
        this.setScale(1.6);
        scene.physics.add.existing(this);
        this.body.setSize(63, 60);
        this.body.setOffset(10, 24);
        this.body.allowGravity = true;


        // Inicializamos las animaciones para este jugador
        this.animations = new Animations(scene);
        this.enemyCollide = false;
        
        this.enemyScore = enemyScore;
        this.difficulty = difficulty;
        // Dirección de movimiento
        this.direction = 1; // 1 = derecha, -1 = izquierda
        this.speed = speed;  // Velocidad del movimiento
        this.i = 0;
        // Límites de patrullaje pasados como parámetros

        

        this.type = type;
        if (type == 1) {
            this.limit = this.setDifficulty();
        }

        if (type == 2) {
            this.limit = 25;
        }


    }


    update() {
        this.i++;
        if (this.i % this.limit === 0) {
            this.direction = this.direction * -1;
            if (this.type == 1) {
                this.limit = this.setDifficulty();
            }

        }
        this.body.setVelocityX(this.direction * this.speed)
        // Detectar si el jugador está tocando el enemigo (colisión)

        //  Detectar si el jugador salta sobre el enemigo
        if (!this.scene.Ariene.body.touching.down) {
            this.scene.Ariene.invulnerable = true;
        } else if (this.scene.Ariene.body.touching.down && this.scene.Ariene.collide == true) {
            this.scene.Ariene.invulnerable = true;


        } else if (this.scene.Ariene.y + this.scene.Ariene.height < this.y && this.scene.Ariene.collide == true) {
            this.scene.Ariene.invulnerable = true;
        } else {
            this.scene.Ariene.invulnerable = false;
        }


        if (this.scene.Ariene.body.velocity.y > 0 &&
            this.scene.Ariene.body.touching.down &&
            this.body.touching.up) {

            this.processed = true; // Marca al enemigo como procesado    
            this.scene.score += this.enemyScore; // Corrige aquí, usando `this.scene`    
            this.scene.scoreText.tintText(' #deff62  ', 1000);
            this.scene.count++;
            this.destroyEnemy();

        }


    }

    // Método que restará una vida al jugador cuando el enemigo lo toque


    // Método para destruir al enemigo cuando el jugador salta sobre él
    destroyEnemy() {
        // Incrementa el puntaje
        this.destroy(); // Destruye el enemigo
    }


    setDifficulty() {
        if (this.difficulty == 1) {
            // Dificultad muy fácil: límites largos para menos cambios de dirección
            return Math.floor(Math.random() * (300 - 250 + 1)) + 250;
        }

        if (this.difficulty == 2) {
            // Dificultad media: límites intermedios
            return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
        }

        if (this.difficulty == 3) {
            // Dificultad difícil: límites cortos para más cambios de dirección
            return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        }
    }




}