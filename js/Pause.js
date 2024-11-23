import Text from './Text.js';
export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'Pause' });
        this.menuX = 500;
        this.menuY = 220;
    }

    preload() {
        // Carga la imagen del fondo
        this.load.image('mainMenuBg', './game_assets/Menu-Image-s.png');
    }

    create() {
        // Agrega la imagen de fondo
        const miImagen = this.add.image(0, 0, 'mainMenuBg').setOrigin(0.0);

        this.tweens.add({
            targets: miImagen,
            x: -2800, // Nueva posición X
            y: 0, // Nueva posición Y
            duration: 100000, // Tiempo en milisegundos
            ease: 'Power1', // Efecto del movimiento
            onComplete: () => {
                console.log('Movimiento terminado');
            }
        });
        // Título del menú

        // Botón "Jugar"
        const playBtn = new Text(this, 'Reanudar', this.menuX, this.menuY);
        playBtn.createButton();

        const levelsBtn = new Text(this, 'Niveles', this.menuX, this.menuY + 100);
        levelsBtn.createButton();

        const backBtn = new Text(this, 'Volver al menu principal', this.menuX, this.menuY + 200);
        backBtn.createButton();
        // Botón "Niveles"


        // Eventos de los botones
        playBtn.getButton().on('pointerdown', () => {
            this.scene.stop(); // Detiene la escena de pausa
            this.scene.resume('Main'); // Reanuda la escena principal
        });

        levelsBtn.getButton().on('pointerdown', () => {
            console.log('Niveles seleccionados'); // Puedes lanzar otra escena aquí
        });

        backBtn.getButton().on('pointerdown', () => {
            this.scene.stop('Main');
            
            this.scene.start('Menu'); // Inicia la escena principal

        });
    }
}

// Configuración del juego

