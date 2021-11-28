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
    }

    createSceneProperties() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    createPointerInteraction() {
        this.setInteractive();
        this.on("pointerdown", (e) => {
            this.clicked = true;
        });
        this.on("pointerup", (e) => {
            this.clicked = false;
        });
        this.on("pointerover", (e) => {
            this.mouseOver = true;
        });
        this.on("pointerout", (e) => {
            this.mouseOver = false;
        })
    }
}