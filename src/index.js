// require("dotenv").config();

const port = process.env.PORT || 3000;
const path = require("path");
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

// configure socket
const bugs = {};

io.on("connection", (socket) => {
    console.log(`Se conecta un cliente: ${socket.id}`);
    bugs[socket.id] = {
        id: socket.id,
        x: (Math.random() * (128 + 128 + 1) - 128),
        y: (Math.random() * (128 + 128 + 1) - 128)
    }
    socket.emit("world:state", bugs);
    io.emit("bug:connected", bugs[socket.id]);
    socket.on("disconnect", () => {
        console.log(`Se desconecta el socket: ${socket.id}`);
        io.emit("bug:disconnected", {
            id: socket.id
        })
    });
    socket.on("bug:position", (data) => {
        io.emit("bug:position", data)
    })
})

// configure endpoints
app.use(express.static(path.join(__dirname, "public")));

// start server
server.listen(port, console.log(`Escuchando en puerto ${port}`));
