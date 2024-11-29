import Text from './Text.js';
import Level from './Level.Js';
export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
        this.menuX = 700;
        this.menuY = 220;
    }

    preload() {
        // Carga la imagen del fondo
        this.load.image('mainMenuBg', './game_assets/Menu-Image-s.png');
        this.load.image('logo', './imgs/MainLogo.png');
    }

    create() {
        // Agrega la imagen de fondo
        const miImagen = this.add.image(0, 0, 'mainMenuBg').setOrigin(0.0);
        this.add.image(330, 230, 'logo').setScale(0.7);

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
        const playBtn = new Text(this, 'Jugar', this.menuX, this.menuY);
        playBtn.createButton();

        const levelsBtn = new Text(this, 'Niveles', this.menuX, this.menuY + 100);
        levelsBtn.createButton();

        const backBtn = new Text(this, 'Regresar', this.menuX, this.menuY + 200);
        backBtn.createButton();
        // Botón "Niveles"


        // Eventos de los botones
        playBtn.getButton().on('pointerdown', () => {
            this.scene.start('Level1'); // Inicia la escena principal
        });

        levelsBtn.getButton().on('pointerdown', () => {

            playBtn.setVisible(false);
            levelsBtn.setVisible(false);


            let levelCount =  this.scene.manager.scenes.filter(scene => scene instanceof Level).length;

            for (let i = 0; i < levelCount; i++) {
                const level = new Text(this, 'Nivel ' + (i + 1), this.menuX, this.menuY + 100 * i);
                level.createButton();
                level.getButton().on('pointerdown', () => {
                    this.scene.start('Level' + (i + 1)); // Inicia la escena correspondiente
                });
                backBtn.setLocation(this.menuX, this.menuY + 100 * (i + 1));
            }

            console.log('Niveles seleccionados'); // Puedes lanzar otra escena aquí
        });

        backBtn.getButton().on('pointerdown', () => {
            window.location.href = './index.html'; // Cambia esto por la URL o archivo HTML deseado
        });
    }
}

// Menu.js

