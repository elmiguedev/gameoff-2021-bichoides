import Entity from "../core/entity";

export default class Bug extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "Bichoide");

        this.createMainProperties();
        this.createNameTag();

    }

    // game loop methods
    // ----------------------

    update() {
        this.updateMainProps();
        this.updateNameTagPosition();
    }

    // creation methods
    // ---------------------
    createMainProperties() {
    }

    createNameTag() {
        this.nameTag = this.scene.add.bitmapText(this.x, this.y - 8, "PixelFont", "Bicho");
        this.nameTag.setOrigin(0.5);
    }

    destroy() {
        super.destroy(true);
        this.nameTag.destroy();
    }

    eat(food) {
        // food.destroy();
    }

    // dynamic and check methods
    // --------------------------
    updateNameTagPosition() {
        this.nameTag.x = this.x;
        this.nameTag.y = this.y - 8;
    }

    updateMainProps() {
        this.collisionEntities = [];
    }


}