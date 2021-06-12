const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const {ChatMensajes} = require('../models');

const chatMensaje = new ChatMensajes();

const socketController = async(socket = new Socket(), io) => {
    
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if (!usuario) {
        return socket.disconnect();
    }

    console.log("Se conectó ", usuario.nombre);

    //Agregar el usuario conectado
    chatMensaje.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensaje.usuariosArr);
    socket.emit('recibir-mensajes', chatMensaje.ultimos10);

    //Conetarlo a una sala especial
    socket.join(usuario.id); //global, socket.id, usuario.id

    //Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMensaje.desconectarUsuario(usuario.id)
        io.emit('usuarios-activos', chatMensaje.usuariosArr);
    });

    socket.on('enviar-mensaje', ({uid, mensaje}) => {

        if(uid){
            //Mensaje privado
            socket.to(uid).emit('mensaje-privado',{de: usuario.nombre, mensaje});
        }else{
            //Mensaje global
            chatMensaje.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensaje.ultimos10)
        }
        
        
    })

}

module.exports = {
    socketController,
}