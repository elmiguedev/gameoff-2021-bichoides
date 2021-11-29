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
        // this.onAttack = false;
    }

    // creation methods
    // ---------------------
    createMainProperties() {
        // this.setDrag(20);
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


    move(target) {
        if (!this.onAttack)
            this.scene.physics.moveToObject(this, target, 20);
    }

    attack(enemy) {
        this.onAttack = true;
        this.scene.physics.moveToObject(this, enemy, 60, 100);
        this.scene.time.addEvent({
            delay: 100,
            callback: () => {
                this.onAttack = false;
                this.setVelocity(0);
            }
        })
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