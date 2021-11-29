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
    }

    createSceneProperties() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
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
}