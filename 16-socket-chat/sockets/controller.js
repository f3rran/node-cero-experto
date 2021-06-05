const { Socket } = require("socket.io")


const socketController = (socket = new Socket()) => {
    console.log("Cliente conectado", socket.id);
}

module.exports = {
    socketController,
}