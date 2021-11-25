import { Physics } from "phaser";

export default class Grass extends Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "Grass");

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }

    // game loop methods
    // ----------------------


    // creation methods
    // ---------------------


}