import { Scene } from "phaser"

import PixelFontPng from "../assets/fonts/slkscr_0.png";
import PixelFontFnt from "../assets/fonts/slkscr.fnt";

export default class BootloaderScene extends Scene {
    constructor(){
        super("BootloaderScene");
    }

    preload() {

        // fonts
        this.load.bitmapFont("PixelFont",PixelFontPng,PixelFontFnt);

        this.load.on("complete", () => {
            this.scene.start("MainScene");
        })
    }

    create() {
        const x = this.game.canvas.width / 2;
        const y = this.game.canvas.height / 2;
        this.add.text(x,y,"...loading...").setOrigin(0.5);
    }
}
