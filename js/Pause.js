import Text from './Text.js';
export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'Pause' });
        this.menuX = 500;
        this.menuY = 220;
        this.previousScene = null; // Variable para almacenar la escena previa

    }

    preload() {
        // Carga la imagen del fondo
        this.load.image('mainMenuBg', './game_assets/Menu-Image-s.png');
    }

    create(data) {

        if (data.previousScene) {
            this.previousScene = data.previousScene;
        }
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
            if (this.previousScene) {
                this.scene.stop(); // Detiene la escena de pausa
                this.scene.resume(this.previousScene); // Reanuda la escena previa
            } else {
                console.error('No se encontró la escena previa para reanudar.');
            }
        });

        levelsBtn.getButton().on('pointerdown', () => {
            console.log('Niveles seleccionados'); // Puedes lanzar otra escena aquí
        });

        backBtn.getButton().on('pointerdown', () => {
            backBtn.setVisible(false);
            playBtn.setVisible(false);
            levelsBtn.setVisible(false);
            
            const confText = new Text(this, '¿Desea salir del juego? El progreso se perderá', this.menuX-200, this.menuY );

            const siBtn = new Text(this, 'Si', this.menuX+50, this.menuY+100 );
            siBtn.createButton();

            siBtn.getButton().on('pointerdown', () => {
                  if (this.previousScene) {
                this.scene.stop(this.previousScene);
                this.scene.start('Menu'); // Reanuda la escena previa
            } else {
                console.error('No se encontró');
            }
            });

            const noBtn = new Text(this, 'No', this.menuX+150, this.menuY+100);
            noBtn.createButton();
            
            noBtn.getButton().on('pointerdown', () => {
                backBtn.setVisible(true);
                playBtn.setVisible(true);
                levelsBtn.setVisible(true);
                confText.setVisible(false);
                siBtn.setVisible(false);
                noBtn.setVisible(false);
            })
          

        });
    }
}

// Configuración del juego

