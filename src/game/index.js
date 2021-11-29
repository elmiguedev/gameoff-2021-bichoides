import { Game } from "phaser";
import WorldHud from "./huds/world.hud";
import BootloaderScene from "./scenes/bootloader.scene";
import WorldScene from "./scenes/world.scene";

if (module.hot) {
    module.hot.accept(function () {
        window.location.reload();
    });
}

const game = new Game({
    type: Phaser.WEBGL,
    width: window.innerWidth / 4,
    height: window.innerHeight / 4,
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
            debug: false
        }
    },
    scene: [
        BootloaderScene,
        WorldScene,
        WorldHud
    ]
});


window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth / 4, window.innerHeight / 4);
}, false);

export default game;