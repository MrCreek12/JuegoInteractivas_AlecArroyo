export default class PlayerAnimations {

    constructor(scene) {
        this.scene = scene;
        this.createAnimations();  // Aquí se crean todas las animaciones
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('Walking', { start: 0, end: 39 }),
            frameRate: 32,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'static',
            frames: this.scene.anims.generateFrameNumbers('idle', { start: 0, end: 39 }),
            frameRate: 26,
            repeat: -1,
        });
    }
}