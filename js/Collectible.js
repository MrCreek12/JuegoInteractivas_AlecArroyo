export default class Collectible extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, player) {
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
      
      this.player = player;
      // Reproducir la animación
      scene.physics.add.overlap(this.player, this, this.collect, null, this);
      
    }
  
    // Puedes agregar métodos personalizados para el objeto, como desvanecerse
    collect() {
      this.player.invulnerable = true;
      this.scene.score += 10;  // Incrementa el puntaje en 10

      // Actualiza la visualización del puntaje
      this.scene.updateScoreDisplay();

      this.scene.tweens.add({
        targets: this,
        alpha: 0,
        duration: 100,
        onComplete: () => {
          this.destroy();
        }
      });
    }
  }
  