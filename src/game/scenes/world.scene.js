import { Scene } from "phaser";
import Bug from "../entities/bug.entity";

export default class WorldScene extends Scene {
    constructor() {
        super("WorldScene");
    }

    // game loop methods
    // ---------------------------

    create() {
        this.createBackground();
        this.createBug();
        this.createHud();
        this.createControls();

        this.add.rectangle(20, 20, 12, 12, 0x111111);
    }

    update() {
        this.checkBugPosition();
        this.bug.update();
    }

    // creation methods
    // ---------------------------

    createBackground() {
        this.cameras.main.setBackgroundColor(0xa6cb96);
    }

    createBug() {
        this.bug = new Bug(this, 10, 10);
        this.cameras.main.startFollow(this.bug);
    }

    createHud() {
        this.scene.launch("WorldHud");
        this.hud = this.scene.get("WorldHud");
        this.hud.setBug(this.bug);
    }

    createControls() {
        this.input.on('pointerdown', (pointer) => {
            if (!this.target) {
                this.target = new Phaser.Math.Vector2();
            }
            this.target.x = pointer.worldX;
            this.target.y = pointer.worldY;
            this.physics.moveToObject(this.bug, this.target, 20);
        });
    }

    // check and dynamic methods
    // ----------------------------
    checkBugPosition() {
        if (this.bug && this.target) {
            const distance = Phaser.Math.Distance.Between(this.bug.x, this.bug.y, this.target.x, this.target.y);
            if (this.bug.body.speed > 0) {
                if (distance < 4) {
                    this.bug.body.reset(this.target.x, this.target.y);
                }
            }
        }
    }


}