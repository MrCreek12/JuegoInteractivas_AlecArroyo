export default class CollisionManager {
    constructor(scene) {
        this.scene = scene; // Guarda la referencia a la escena
    }


    hitPlayer(player, enemy) {

        if (!player.invulnerable) { // Verificar si el jugador NO es invulnerable
            player.body.touching.down = false;
            player.collide = true;
            this.scene.loseLife();
            console.log('El jugador ha sido golpeado por el enemigo.');

            player.setTint(0xff0000);

            this.scene.time.delayedCall(2000, () => { // 2 segundos de invulnerabilidad
                player.body.touching.down = true;
                player.collide = false;
                player.clearTint();
            });
        }
    }

}
