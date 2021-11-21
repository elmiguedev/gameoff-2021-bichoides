import { Game } from "phaser";
import WorldHud from "./huds/world.hud";
import BootloaderScene from "./scenes/bootloader.scene";
import WorldScene from "./scenes/world.scene";

if (module.hot) {
    module.hot.accept(function () {
      window.location.reload();
    });
}

export default new Game({
    width: 128,
    height: 128,
    scale: {
        zoom: 4
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0,
            },
            debug: true
        }
    },
    scene: [
        BootloaderScene,
        WorldScene,
        WorldHud
    ]
});