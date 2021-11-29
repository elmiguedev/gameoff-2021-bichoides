class World {

    constructor() {
        this.createWorld();
    }

    clearPoint(x, y) {
        console.log("POSITION", x, y);
        const chunkPosition = this.getChunkPosition(x, y);
        const chunkRealPosition = {
            x: chunkPosition.x * 128,
            y: chunkPosition.y * 128,
        }
        const chunk = this.getChunkFromRealCoords(x, y);
        const relativePosition = {
            x: x - chunkRealPosition.x,
            y: y - chunkRealPosition.y
        }
        const relativeTilePosition = {
            x: relativePosition.x / 8,
            y: relativePosition.y / 8
        };
        console.log("CHUNK POSITION:", chunkPosition);
        console.log("CHUNK REAL POSITION:", chunkRealPosition);
        console.log("RELATIVE POSITION:", relativePosition);
        console.log("TILE POSITION:", relativeTilePosition);

        chunk[relativeTilePosition.x][relativeTilePosition.y] = 0;

    }

    getTilePosition(x, y) {
        return {
            x: Math.trunc(x / 8),
            y: Math.trunc(y / 8)
        }
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
            x: this.randomBetween(0, 128),
            y: this.randomBetween(0, 128),
        }
    }
}

module.exports = World;