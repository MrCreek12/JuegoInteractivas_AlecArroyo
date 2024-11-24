export default class TextManager {
  constructor(scene, labelText, x, y, fontSize = '32px') {
    this.scene = scene; // Escena actual
    this.textObject = this.scene.add.text(x, y, labelText, {
      fontSize: fontSize,
      fontFamily: "Faculty Glyphic",
      fill: '#fff',
    });
    this.textObject.setScrollFactor(0); // Esto asegura que el texto sea estático en la pantalla
  }

  // Método para actualizar el valor dinámico
  updateValue(newValue, text) {
    this.dynamicValue = newValue;
    this.textObject.setText(`${text} ${this.dynamicValue}`);

  }

  updateValueInverse(newValue, text) {
    this.dynamicValue = newValue;
    this.textObject.setText(` ${this.dynamicValue} ${text}`);

  }

  setVisible(visible) {
    this.textObject.setVisible(visible);
  }

  setFontSize(fontSize) {
    this.textObject.setStyle({ fontSize: fontSize });
  }
  setDynamicValue(dynamicValue, text) {
    this.dynamicValue = dynamicValue;
    this.textObject.setText(`${text} ${this.dynamicValue}`);
  }

  setAlpha(alpha) {
    this.textObject.setAlpha(alpha);
  }

  setDynamicValueInverse(dynamicValue, text) {
    this.dynamicValue = dynamicValue;
    this.textObject.setText(` ${this.dynamicValue} ${text}`);
  }
  setColor(color) {
    this.textObject.setStyle({ fill: color });
  }

  tintText(color, duration) {
    // Cambia el color del texto al especificado
    this.textObject.setColor(color);

    // Después del tiempo especificado, vuelve a ponerlo blanco
    this.scene.time.delayedCall(duration, () => {
      this.textObject.setColor('#ffffff');
    });
  }

  setScrollFactor(scrollFactor) {
    this.textObject.setScrollFactor(scrollFactor);
  }

  centerText() {
    // Obtiene las coordenadas centrales de la cámara principal
    const centerX = this.scene.cameras.main.centerX;
    const centerY = this.scene.cameras.main.centerY;

    // Actualiza la posición del texto al centro
    this.textObject.setPosition(centerX, centerY);
    // Establece el origen del texto al centro para que se alinee correctamente
    this.textObject.setOrigin(0.5);
  }

  createButton() {
    // this.textObject.setStyle({ fill: color });
    this.textObject.setStyle({ padding: { x: 90, y: 30 } });

    // this.textObject.setStyle({ backgroundColor: '#3fb3d5 ' });
    this.textObject.setStyle({ color: '#fff' });

    this.textObject.setInteractive();

    this.textObject.on('pointerover', () => {
      this.textObject.setStyle({ color: '#fff886 ' });
    });

    this.textObject.on('pointerout', () => {
      this.textObject.setStyle({ color: '#fff' });
    });

  }

  getButton() {
    return this.textObject;
  }

}