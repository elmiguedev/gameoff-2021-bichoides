import { Scene } from "phaser";

export default class WorldHud extends Scene {

    constructor() {
        super("WorldHud");

    }

    update() {
        this.updatePosition();
        this.updateInteractionInfo();
    }

    create() {
        this.position = this.add.bitmapText(10, 10, "PixelFont", "0,0");
        this.interaction = this.add.bitmapText(10, 20, "PixelFont", "");
        this.tilePosition = this.add.bitmapText(10, 40, "PixelFont", "0,0");

    }

    setBug(bug) {
        this.bug = bug;
    }

    updatePosition() {
        if (this.bug) {
            this.position.setText(`${Math.trunc(this.bug.x)},${Math.trunc(this.bug.y)}`);
        }
    }

    updateInteractionInfo() {
        this.interaction.text = "";
    }

    setInteractionInfo(name) {
        this.interaction.text = name;
    }

    setTilePosition(x, y) {
        this.tilePosition.text = `${x},${y}`;
    }

}