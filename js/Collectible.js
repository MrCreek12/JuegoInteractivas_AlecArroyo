export default class Collectible extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, player,item,scoreValue) {
      // Llama al constructor de la clase base Phaser.GameObjects.Sprite
      super(scene, x, y, key);
      


      this.setScale(0.3);
      // Agrega el sprite a la escena
      scene.add.existing(this);
      this.item = item;
      this.scoreValue = scoreValue;
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
      if (this.item === 1) {
        this.player.invulnerable = true;
        this.scene.score += this.scoreValue;  // Incrementa el puntaje en 10
        this.scene.scoreText.tintText('#4fff4c ', 1000);
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

      if (this.item === 2) {
       
        this.body.x = this.scene.invetoryX;
        this.body.y = 140;
        this.setScrollFactor(0);
      
        this.scene.invetoryX += 50;
    }
    }
  }
  