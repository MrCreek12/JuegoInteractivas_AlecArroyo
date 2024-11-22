import Text from './Text.js';
export default class  Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu' });
        this.menuX=700;
        this.menuY=220;
    }

    preload() {
        // Carga la imagen del fondo
        this.load.image('mainMenuBg', './game_assets/main-menu.png');
    }

    create() {
        // Agrega la imagen de fondo
        this.add.image(0, 0, 'mainMenuBg').setOrigin(0.0);

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

