import { Scene } from "phaser";
import Bug from "../entities/bug.entity";
import io from "socket.io/client-dist/socket.io";
import Grass from "../entities/grass.entity";

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
        this.createSocket();


    }

    update() {
        this.checkPointer();
        this.checkBugPosition();
        this.bug.update();
    }

    // creation methods
    // ---------------------------

    createBackground() {
        this.cameras.main.setBackgroundColor(0xa6cb96);
        this.cameras.main.setZoom(2);

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
        this.targetMark = this.add.bitmapText(0, 0, "PixelFont", "x").setOrigin(0.5);
        this.targetMark.setVisible(false);
        // this.input.on('pointerdown', (pointer) => {
        //     if (!this.target) {
        //         this.target = new Phaser.Math.Vector2();
        //     }
        //     this.target.x = pointer.worldX;
        //     this.target.y = pointer.worldY;
        //     this.targetMark.x = pointer.worldX;
        //     this.targetMark.y = pointer.worldY;
        //     this.targetMark.setVisible(true);
        //     this.physics.moveToObject(this.bug, this.target, 20);
        // });
    }

    createSocket() {
        this.enemies = this.physics.add.group({
            runChildUpdate: true
        });
        this.socket = io();
        this.socket.on("bug:connected", (data) => {
            console.log("Se conecta bicho: ", data);
            if (this.socket.id !== data.id) {
                this.createEnemyBug(data);
            }
        })
        this.socket.on("world:state", (state) => {
            for (const id in state) {
                if (id !== this.socket.id) {
                    this.createEnemyBug(state[id]);
                } else {
                    this.bug.x = state[id].x;
                    this.bug.y = state[id].y;
                }
            }
            console.log("world:", state)
        });
        this.socket.on("world:chunk", (chunk) => {
            this.createChunk(chunk);
        })
        this.socket.on("bug:disconnected", (data) => {
            console.log("Se desconecta bicho: ", data);
            this.destroyEnemyBug(data.id);

        });
        this.socket.on("bug:position", (data) => {
            const bug = this.enemies.getMatching("id", data.id)[0];
            if (bug) {
                bug.x = data.x;
                bug.y = data.y;
            }
        });
        this.socket.timer = this.time.addEvent({
            repeat: -1,
            delay: 1000 / 30,
            callback: () => {
                this.notifyBugPosition();
            }
        });

    }

    createEnemyBug(data) {
        const bug = new Bug(this, data.x, data.y);
        bug.id = data.id;
        this.enemies.add(bug);
    }

    destroyEnemyBug(id) {
        const bug = this.enemies.getMatching("id", id)[0];
        if (bug) {
            bug.destroy();
        }
        this.enemies.remove(bug);
    }

    createChunk(chunk) {
        for (let i = 0; i < chunk.data.length; i++) {
            const row = chunk.data[i];
            for (let j = 0; j < row.length; j++) {
                const tile = row[j];
                if (tile === 1) {
                    const x = chunk.cx * 128 + i * 8;
                    const y = chunk.cy * 128 + j * 8;
                    new Grass(this, x, y);
                }
            }
        }
    }

    // check and dynamic methods
    // ----------------------------
    checkBugPosition() {
        if (this.bug && this.target) {
            const distance = Phaser.Math.Distance.Between(this.bug.x, this.bug.y, this.target.x, this.target.y);
            if (this.bug.body.speed > 0) {
                if (distance < 2) {
                    this.bug.body.reset(this.target.x, this.target.y);
                    this.targetMark.setVisible(false);
                }
            }
        }
    }

    checkPointer() {
        const pointer = this.input.activePointer;
        if (pointer.isDown) {
            if (!this.target) {
                this.target = new Phaser.Math.Vector2();
            }
            this.target.x = pointer.worldX;
            this.target.y = pointer.worldY;
            this.targetMark.x = pointer.worldX;
            this.targetMark.y = pointer.worldY;
            this.targetMark.setVisible(true);
            this.physics.moveToObject(this.bug, this.target, 20);
            // ...
        }
    }

    notifyBugPosition() {
        this.socket.emit("bug:position", {
            id: this.socket.id,
            x: this.bug.x,
            y: this.bug.y
        });
    }

}