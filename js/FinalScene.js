import Text from './Text.js';
import Level from './Level.Js';
export default class FinalScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinalScene' });
        this.menuX = 700;
        this.menuY = 120;
        this.lastScene = null
        this.done = false
        this.final = 0
        this.finalScoreText = null
        this.backBtn = null
        this.linkReady= 0;
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

        this.createBackground();
       
        // Título del menú
        const menuTitle = new Text(this, 'Haz completado todos los niveles', this.menuX - 50, this.menuY);
        menuTitle.setVisible(true);

        this.finalLevelScore = this.scene.get(this.lastScene).getScore();
        const cantLlavesAzules = this.scene.get(this.lastScene).getBlueKeys();
        const cantLlavesRojas = this.scene.get(this.lastScene).getRedKeys();
        const cantLlavesAmarillas = this.scene.get(this.lastScene).getYellowKeys();

         this.calcularPuntajeFinal(cantLlavesAmarillas, cantLlavesAzules, cantLlavesRojas);
         
        this.createRegisterText(this.done);

        

        this.finalScoreText = new Text(this, 'Puntaje final: ' + this.finalLevelScore, this.menuX, this.menuY + 100);
        this.finalScoreText.setVisible(true);
        this.finalScoreText.setDynamicValue(this.finalLevelScore, 'Puntaje final: ');

        this.backBtn = new Text(this, 'Salir', this.menuX - 400, this.menuY + 500);

        this.backBtn.createButton();
        this.backBtn.setVisible(false);
        console.log('BotonCreado');

        this.backBtn.getButton().on('pointerdown', () => {
            this.enlace.remove();
            this.scene.start('Menu');
            this.scene.stop('FinalScene');
        });

        const Yllaves = new Text(this, 'Llaves amarillas:(+100pt C/U):  ' + cantLlavesAmarillas, this.menuX, this.menuY + 200);
        Yllaves.setVisible(true);
        Yllaves.setColor('#ffff00');

        const Allaves = new Text(this, 'Llaves azules:(+200pt  C/U):  ' + cantLlavesAzules, this.menuX, this.menuY + 300);
        Allaves.setVisible(true);
        Allaves.setColor('#0000ff');

        const Rllaves = new Text(this, 'Llaves rojas:(+300pt  C/U):  ' + cantLlavesRojas, this.menuX, this.menuY + 400);
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
           this.time.delayedCall(1000, () => {
               this.createLink(this.linkReady);
           }) 
        });

    }

    createBackground(){
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
    }

    getFinalCounts() {



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
    sendFinalScore() {
        let miVariable = 'Hola desde JavaScript';

        // Usamos fetch para enviar la variable al archivo PHP
        fetch('./register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'miVariable=' + encodeURIComponent(miVariable)
        })
            .then(response => response.text())  // Puede ser JSON dependiendo de lo que devuelva PHP
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    createRegisterText() {

        this.registerText = new Text(this, '¡Registrate para guardar tu puntaje!', this.menuX - 600, this.menuY + 330);
        this.registerText.setVisible(false);

        //  this.goRegister = new Text(this, 'Ir A registrarse', this.registerText.getButton().x+120, this.registerText.getButton().y+100);
        // this.goRegister.createButton();
        //  this.goRegister.setVisible(false);

        // this.goRegister.getButton().on('pointerdown', () => {
        //     this.sendFinalScore();
        //     window.location.href = './register.php'; // Cambia esto por la URL o archivo HTML deseado
        // });


    }

    createLink() {
       
        this.enlace = document.createElement("a");
        this.enlace.href = "./register.php?score=" + (this.final-5) + "";  // Evita que el enlace haga una redirección
        this.enlace.innerHTML = "Ir a Registrarse";  // Asigna el puntaje como texto del enlace

        // Establecer el estilo para colocarlo en el canvas
        this.enlace.style.position = "absolute";  // Asegura que el enlace esté posicionado en relación al documento
        this.enlace.style.top = (this.menuY + 500) + "px";  // Ajustar top según el valor de menuY
        this.enlace.style.left = (this.menuX - 150) + "px";  // Usar el mismo valor para left
        
        this.enlace.style.opacity = this.linkReady;
        this.enlace.style.transform = "translate(0, 0)";  // Sin centrar, se posiciona en las coordenadas especificadas
        
        // Estilos adicionales para hacerlo parecer un enlace
        this.enlace.style.fontSize = "30px";
        this.enlace.style.color = "white";  // El color de la letra es blanco
        this.enlace.style.textDecoration = "none";  // Se quita el subrayado
        this.enlace.style.cursor = "pointer";  // Para que se vea clickeable
        
        // Estilo de hover para cambiar el color
        this.enlace.style.transition = "color 0.3s ease";  // Transición suave en el cambio de color
        this.enlace.addEventListener("mouseover", () => {
            this.enlace.style.color = "#fff886";  // Color hexadecimal para el hover (rojo anaranjado)
        });
        this.enlace.addEventListener("mouseout", () => {
            this.enlace.style.color = "white";  // Vuelve a blanco cuando el cursor se retira
        });
        
        // Agregar el enlace al body
        document.body.appendChild(this.enlace);
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
                    this.registerText.setVisible(true);
                    this.enlace.style.opacity = 1;
                    // this.goRegister.setVisible(true);
                    
                });

            }


        }
    }
}
// Menu.js

