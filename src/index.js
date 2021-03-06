// require("dotenv").config();

const port = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
const World = require("./core/world");

// configure socket
const bugs = {};
const world = new World();
console.log(world.getChunk(1, 1));

io.on("connection", (socket) => {
    console.log(`Se conecta un cliente: ${socket.id}`);
    // create random coords
    const position = world.getRandomPosition();
    const chunkPosition = world.getChunkPosition(position.x, position.y);
    // create bug data
    bugs[socket.id] = {
        id: socket.id,
        x: position.x,
        y: position.y,
        cx: chunkPosition.x,
        cy: chunkPosition.y
    }
    socket.emit("world:state", bugs);
    socket.emit("world:chunk", {
        cx: chunkPosition.x,
        cy: chunkPosition.y,
        data: world.getChunk(chunkPosition.x, chunkPosition.y)
    });

    io.emit("bug:connected", bugs[socket.id]);
    socket.on("disconnect", () => {
        console.log(`Se desconecta el socket: ${socket.id}`);
        io.emit("bug:disconnected", {
            id: socket.id
        })
    });
    socket.on("bug:position", (data) => {
        // check chunk position
        const currentChunk = world.getChunkPosition(bugs[socket.id].x, bugs[socket.id].y);
        const chunkPosition = world.getChunkPosition(data.x, data.y);

        if (currentChunk.x !== chunkPosition.x || currentChunk.y !== chunkPosition.y) {
            socket.emit("world:chunk", {
                cx: chunkPosition.x,
                cy: chunkPosition.y,
                data: world.getChunk(chunkPosition.x, chunkPosition.y)
            });
        }

        bugs[socket.id].x = data.x;
        bugs[socket.id].y = data.y;
        io.emit("bug:position", data)
    });
    socket.on("bug:eat", (data) => {
        // update world
        world.clearPoint(data.x, data.y);
        io.emit("bug:eat", data);
    })

    socket.on("bug:attack", (data) => {
        io.emit("bug:attack", data);
    })
})

// configure endpoints
app.use(express.static(path.join(__dirname, "public")));

// start server
server.listen(port, console.log(`Escuchando en puerto ${port}`));
