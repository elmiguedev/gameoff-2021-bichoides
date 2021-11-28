import { Physics } from "phaser";

export default class Bug extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Bichoide");

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.canEat = false;
        this.collideEntity = null;

        this.createNameTag();
        this.createInteractions();
    }

    // game loop methods
    // ----------------------

    update() {
        this.pressed = false;
        this.updateMainProps();
        this.updateNameTagPosition();
    }

    // creation methods
    // ---------------------

    createNameTag() {
        this.nameTag = this.scene.add.bitmapText(this.x, this.y - 8, "PixelFont", "Bicho");
        this.nameTag.setOrigin(0.5);
    }

    createInteractions() {
        this.setInteractive({ cursor: "pointer" });
        this.on("pointerdown", (e) => {
            this.clicked = true;
        });
        this.on("pointerout", () => {
            this.mouseOver = false;
        })
        this.on("pointerover", () => {
            this.mouseOver = true;
        })

    }

    destroy() {
        super.destroy(true);
        this.nameTag.destroy();
    }

    // dynamic and check methods
    // --------------------------
    updateNameTagPosition() {
        this.nameTag.x = this.x;
        this.nameTag.y = this.y - 8;
    }

    updateMainProps() {
        this.canEat = false;
    }


}