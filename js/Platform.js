export default class Platform {
    constructor(scene, x, y, key) {
      this.scene = scene;
      this.x = x;
      this.y = y;
      this.key = key;
      
      // Crear la plataforma y agregarla al grupo de plataformas
      this.platform = this.scene.platforms.create(this.x, this.y, this.key).setOrigin(0.5, 0.5);

      this.platform.setScale(1);


      this.platform.body.setSize(
        this.platform.width * this.platform.scaleX, // Ajustar ancho
        this.platform.height * this.platform.scaleY  // Ajustar alto
      );

      
    }
  }