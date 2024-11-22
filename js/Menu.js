import Text from './Text.js';
export default class  Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
        this.menuX=700;
        this.menuY=220;
    }

    preload() {
        // Carga la imagen del fondo
        this.load.image('mainMenuBg', './game_assets/Menu-Image.png');
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
             this.scene.start('Main'); // Inicia la escena principal
         });

        levelsBtn.getButton().on('pointerdown', () => {
            console.log('Niveles seleccionados'); // Puedes lanzar otra escena aquí
        });

        backBtn.getButton().on('pointerdown', () => {
            console.log('Regresar al menú principal'); // Implementa tu lógica de regreso
        });
    }
}

// Configuración del juego

