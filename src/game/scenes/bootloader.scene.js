import { Scene } from "phaser"

// ui assets
import PixelFontPng from "../assets/fonts/slkscr_0.png";
import PixelFontFnt from "../assets/fonts/slkscr.fnt";

// entities assets
import BichoidePng from "../assets/img/bugs/bichoide.png";
import GrassPng from "../assets/img/world/grass.png";


export default class BootloaderScene extends Scene {
    constructor() {
        super("BootloaderScene");
    }

    preload() {

        // fonts
        this.load.bitmapFont("PixelFont", PixelFontPng, PixelFontFnt);

        // bugs
        this.load.image("Bichoide", BichoidePng);
        this.load.image("Grass", GrassPng);

        // load handler
        this.load.on("complete", () => {
            this.scene.start("WorldScene");
        })
    }

    create() {
        const x = this.game.canvas.width / 2;
        const y = this.game.canvas.height / 2;
        this.add.text(x, y, "...loading...").setOrigin(0.5);
    }
}
