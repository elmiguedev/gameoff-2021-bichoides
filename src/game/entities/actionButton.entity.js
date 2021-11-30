export default class ActionButton {

    constructor(scene, x, y) {
        /** @type {Phaser.Scene} */
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.createStructure();

    }

    setText(text) {
        this.text.setText(text);
        this.background.setDisplaySize(this.text.width + 8, this.text.height + 8);
    }

    setColor(color) {
        this.text.setTint(color);
    }

    setBackgroundColor(color) {
        this.background.setFillStyle(color);
    }

    createStructure() {
        this.text = this.scene.add.bitmapText(
            this.x,
            this.y,
            "PixelFont",
            "Action"
        );
        this.text.setCenterAlign();
        this.text.setOrigin(0.5);
        this.background = this.scene.add.rectangle(
            this.x,
            this.y,
            this.text.width + 8,
            this.text.height + 8,
            0xffffff
        ).setDepth(this.text.depth - 1);

        this.background.setInteractive({ cursor: "pointer" });
        this.text.setInteractive({ cursor: "pointer" });
        this.background.on("pointerdown", (e) => {
            if (this.onClick) {
                this.scene.input.stopPropagation();
                console.log(e);
                e.event.stopPropagation();
                this.onClick(e);
            }
        })
        this.text.on("pointerdown", (e) => {
            if (this.onClick) {
                console.log(e);
                e.event.stopPropagation();
                this.onClick(e);
            }
        })
    }

    addListener(callback) {
        this.onClick = callback;
    }

    setVisible(visible) {
        this.text.setVisible(visible);
        this.background.setVisible(visible);
    }




}