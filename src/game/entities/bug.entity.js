import { Physics } from "phaser";

export default class Bug extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Bichoide");

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.createNameTag();
    }

    // game loop methods
    // ----------------------

    update() {
        this.updateNameTagPosition();
    }

    // creation methods
    // ---------------------

    createNameTag() {
        this.nameTag = this.scene.add.bitmapText(this.x, this.y - 8, "PixelFont", "Bicho");
        this.nameTag.setOrigin(0.5);
    }

    // dynamic and check methods
    // --------------------------
    updateNameTagPosition() {
        this.nameTag.x = this.x;
        this.nameTag.y = this.y - 8;
    }

}