import { Game } from "phaser";
import BootloaderScene from "./scenes/bootloader.scene";
import MainScene from "./scenes/main.scene";

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
        MainScene
    ]
});