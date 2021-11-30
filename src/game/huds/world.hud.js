import { Scene } from "phaser";
import ActionButton from "../entities/actionButton.entity";

export default class WorldHud extends Scene {

    constructor() {
        super("WorldHud");

    }

    update() {
        this.updateActionButtons();
        this.updatePosition();
        this.updateInteractionInfo();
    }

    create() {
        this.position = this.add.bitmapText(10, 10, "PixelFont", "0,0");
        this.interaction = this.add.bitmapText(10, 20, "PixelFont", "");
        this.tilePosition = this.add.bitmapText(10, 40, "PixelFont", "0,0");

        this.createActionButton();
    }

    setBug(bug) {
        this.bug = bug;
    }

    createActionButton() {
        const center = {
            x: this.game.canvas.width / 2,
            y: this.game.canvas.height - 16,
        }
        this.actionButton = new ActionButton(this, center.x, center.y);
        this.actionButton.setText("Recolectar");
        this.actionButton.setColor(0x000000);
        this.actionButton.setBackgroundColor(0xffffff);
        this.actionButton.setVisible(false);
    }

    showActionButton(text, action) {
        this.actionButton.setText(text);
        this.actionButton.addListener((e) => {
            action(e);
        });
        this.actionButton.setVisible(true);
    }

    updateActionButtons() {
        this.actionButton.setVisible(false);
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