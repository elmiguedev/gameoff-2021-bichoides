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
        this.bug.update();

        this.checkBugPosition();

    }

    // creation methods
    // ---------------------------

    createBackground() {
        this.cameras.main.setBackgroundColor(0xa6cb96);
        this.cameras.main.setZoom(2);

    }

    createBug() {
        this.bug = new Bug(this, 10, 10);
        this.bug.setDepth(3);
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
        this.input.on("pointerdown", (pointer) => {
            this.moveBug(pointer)
        })
        this.input.on("pointermove", (pointer) => {
            if (pointer.isDown) {
                this.moveBug(pointer);
            }
        });
    }

    createSocket() {
        this.enemies = this.physics.add.group({
            runChildUpdate: true
        });
        this.grasses = this.physics.add.group();


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
            if (data.id !== this.socket.id) {
                const bug = this.enemies.getMatching("id", data.id)[0];
                if (bug) {
                    bug.x = data.x;
                    bug.y = data.y;
                }
            }
        });
        this.socket.on("bug:eat", (data) => {
            const grass = this.grasses.children.getArray().find(g => g.x === data.x && g.y === data.y);
            if (grass) {
                this.grasses.remove(grass);
                grass.destroy();
            }

        })
        this.socket.on("bug:attack", (data) => {
            if (data.id === this.socket.id) {
                this.cameras.main.shake();
            }
        })
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
        bug.body.setImmovable(true);
        bug.createTriggerZone(10);

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
        this.grasses.clear(true, true);
        for (let i = 0; i < chunk.data.length; i++) {
            const row = chunk.data[i];
            for (let j = 0; j < row.length; j++) {
                const tile = row[j];
                const x = chunk.cx * 128 + i * 8;
                const y = chunk.cy * 128 + j * 8;
                if (tile === 1) {
                    const grass = new Grass(this, x, y);
                    grass.createTriggerZone(10);
                    grass.addTriggerListener(this.bug, (grass) => {
                        this.hud.showActionButton("Comer", () => {
                            this.socket.emit("bug:eat", {
                                type: "grass",
                                x: grass.x,
                                y: grass.y
                            })
                        })
                    })
                    grass.setDepth(2);
                    this.grasses.add(grass);
                }
            }
        }
    }

    moveBug(pointer) {
        if (!this.target) {
            this.target = new Phaser.Math.Vector2();
        }
        this.target.x = pointer.worldX;
        this.target.y = pointer.worldY;
        this.targetMark.x = pointer.worldX;
        this.targetMark.y = pointer.worldY;
        this.targetMark.setVisible(true);

        this.bug.move(this.target);

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
    notifyBugPosition() {
        this.socket.emit("bug:position", {
            id: this.socket.id,
            x: this.bug.x,
            y: this.bug.y
        });
    }

}