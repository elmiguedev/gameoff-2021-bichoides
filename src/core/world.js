class World {

    constructor() {
        this.createWorld();
    }

    getChunkPosition(x, y) {
        return {
            x: Math.trunc(x / 128),
            y: Math.trunc(y / 128)
        }
    }

    getChunkFromRealCoords(x, y) {
        const cx = Math.trunc(x / 128);
        const cy = Math.trunc(y / 128);
        return this.getChunk(cx, cy);
    }

    getChunk(x, y) {
        return this.chunks[x][y];
    }

    createWorld() {
        this.chunks = [];
        for (let i = 0; i < 16; i++) {
            const row = [];
            for (let j = 0; j < 16; j++) {
                row.push(this.createRandomChunk());
            }
            this.chunks.push(row);
        }
    }

    createRandomChunk() {
        const tiles = [];
        for (let i = 0; i < 16; i++) {
            const row = [];
            for (let j = 0; j < 16; j++) {
                const r = Math.random();
                if (r < 0.90) row.push(0);
                else row.push(1);
            }
            tiles.push(row);
        }
        return tiles;
    }

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    getRandomPosition() {
        return {
            x: this.randomBetween(0, 1280),
            y: this.randomBetween(0, 1280),
        }
    }
}

module.exports = World;