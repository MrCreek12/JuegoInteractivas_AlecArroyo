export default class Background extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key) {

        super(scene, x, y, key); // Llama al constructor de la clase base
        this.setOrigin(0, 0); // Establece el origen en la esquina superior izquierda

        // Agrega el sprite a la escena
        scene.add.existing(this); // Usa 'this' para agregar el sprite actual
    }


}