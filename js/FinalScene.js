import Text from './Text.js';
import Level from './Level.Js';
export default class FinalScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinalScene' });
        this.menuX = 700;
        this.menuY = 220;
        this.lastScene = null
        this.done = false
        this.final = 0
        this.finalScoreText = null
        this.backBtn = null
    }

    setFinalScores(score, blueKeys, redKeys, yellowKeys) {

        this.finalLevelScore = score
        this.finalBlueKeys = blueKeys
        this.finalRedKeys = redKeys
        this.finalYellowKeys = yellowKeys
    }

    preload() {
        // Carga la imagen del fondo
        this.load.image('mainMenuBg', './game_assets/Menu-Image-s.png');
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
        const menuTitle = new Text(this, 'Haz completado todos los niveles', this.menuX, this.menuY);
        menuTitle.setVisible(true);

        this.finalLevelScore = this.scene.get(this.lastScene).getScore();

        const cantLlavesAzules = this.scene.get(this.lastScene).getBlueKeys();
        const cantLlavesRojas = this.scene.get(this.lastScene).getRedKeys();
        const cantLlavesAmarillas = this.scene.get(this.lastScene).getYellowKeys();

        this.calcularPuntajeFinal(cantLlavesAmarillas, cantLlavesAzules, cantLlavesRojas);

        this.finalScoreText = new Text(this, 'Puntaje final: ' + this.finalLevelScore, this.menuX, this.menuY + 100);
        this.finalScoreText.setVisible(true);
        this.finalScoreText.setDynamicValue(this.finalLevelScore, 'Puntaje final: ');

        this.backBtn = new Text(this, 'Salir', this.menuX - 400, this.menuY + 400);

        this.backBtn.createButton();
        this.backBtn.setVisible(false);
        console.log('BotonCreado');

        this.backBtn.getButton().on('pointerdown', () => {
            this.scene.start('Menu');
            this.scene.stop('FinalScene');
        });

        const Yllaves = new Text(this, 'Llaves amarillas:(+100pt C/U) ' + cantLlavesAmarillas, this.menuX, this.menuY + 200);
        Yllaves.setVisible(true);
        Yllaves.setColor('#ffff00');

        const Allaves = new Text(this, 'Llaves azules:(+200pt  C/U) ' + cantLlavesAzules, this.menuX, this.menuY + 300);
        Allaves.setVisible(true);
        Allaves.setColor('#0000ff');

        const Rllaves = new Text(this, 'Llaves rojas:(+300pt  C/U) ' + cantLlavesRojas, this.menuX, this.menuY + 400);
        Rllaves.setVisible(true);
        Rllaves.setColor('#ff0000');


        this.animateText(this.finalScoreText, 0);
        this.animateText(Yllaves, 1000); // Aparece después de 1 segundos
        this.animateText(Allaves, 2000); // Aparece después de 2 segundo
        this.animateText(Rllaves, 3000); // Aparece después de 3 segundos
        // this.done=true

        this.time.delayedCall(5000, () => {
            this.done = true
            this.i = this.finalLevelScore
        });

    }

    animateText(textObject, delay) {
        textObject.setVisible(false); // Ocultar inicialmente

        this.time.delayedCall(delay, () => {
            textObject.setVisible(true); // Mostrar el texto
            this.tweens.add({
                targets: textObject,
                alpha: 0, // Cambiar a transparente
                duration: 1000, // Duración del desvanecimiento
                ease: 'Power1',
                // onComplete: () => {
                //     textObject.getButton().destroy(); // Opcional: Eliminar el texto después
                // }
            });
        });
    }

    calcularPuntajeFinal(cantLlavesAmarillas, cantLlavesAzules, cantLlavesRojas) {
        let puntajeFinal = this.finalLevelScore;
        puntajeFinal += cantLlavesAmarillas * 100;
        puntajeFinal += cantLlavesAzules * 200;
        puntajeFinal += cantLlavesRojas * 300;
        this.final = puntajeFinal;
    }

    setLastScene(scene) {

        this.lastScene = scene
    }

    updateScoreDisplay() {


    }
    update() {
        if (this.done) {


            this.i = this.i + 5

            if (this.i < this.final) {
                this.finalScoreText.updateValue(this.i, 'Puntaje Final:');
                this.finalScoreText.setColor('#d2ff2d');

            }
            if (this.i >= this.final) {
                
                this.time.delayedCall(1000, () => {
                     this.backBtn.setVisible(true);
                });
                
            }


        }
    }
}
// Menu.js

