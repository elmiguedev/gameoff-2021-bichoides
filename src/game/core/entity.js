export default class Entity extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.createProperties();
        this.createSceneProperties();
        this.createPointerInteraction();
    }

    createProperties() {
        this.clicked = false;
        this.mouseOver = false;
        this.lastClick = 0;
        this.triggerZone = null;
    }

    createSceneProperties() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    createTriggerZone(radius) {
        this.triggerZone = this.scene.add.circle(this.x, this.y, radius, 0xffffff, 0.5);
        this.scene.physics.add.existing(this.triggerZone);
        this.triggerZone.body.setCircle(radius);
    }

    addTriggerListener(target, callback) {
        this.triggerZone.overlap = this.scene.physics.add.overlap(this.triggerZone, target, () => {
            callback(this);
        });
    }

    createPointerInteraction() {
        this.setInteractive();
        this.on("pointerdown", (e) => {
            this.clicked = true;
            let clickDelay = this.scene.time.now - this.lastClick;
            this.lastClick = this.scene.time.now;
            if (clickDelay < 350) {
                this.doubleClicked = true;
                if (this.onDoubleClick) {
                    this.onDoubleClick();
                }
            }
        });
        this.on("pointerup", (e) => {
            this.clicked = false;
            this.doubleClicked = false;
        });
        this.on("pointerover", (e) => {
            this.mouseOver = true;
        });
        this.on("pointerout", (e) => {
            this.mouseOver = false;
        })
    }

    destroy() {
        super.destroy(true);
        this.triggerZone.destroy();
    }
}