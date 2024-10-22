export default class Collectible extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
      // Llama al constructor de la clase base Phaser.GameObjects.Sprite
      super(scene, x, y, key);

      this.setScale(0.3);
      // Agrega el sprite a la escena
      scene.add.existing(this);
  
      // Habilitar la física para el objeto
      scene.physics.add.existing(this);
      
      // Configurar las propiedades de física
      this.body.allowGravity = false;
      this.body.immovable = true;
  
      // Reproducir la animación
      this.anims.play('burning');
    }
  
    // Puedes agregar métodos personalizados para el objeto, como desvanecerse
    collect() {
      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          this.destroy();
        }
      });
    }
  }
  