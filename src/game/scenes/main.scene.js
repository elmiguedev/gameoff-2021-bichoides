import { Scene } from "phaser";

export default class MainScene extends Scene {
    constructor() {
        super("MainScene");
    }

    create() {
        this.add.bitmapText(10,10,"PixelFont","holis")
    }
}