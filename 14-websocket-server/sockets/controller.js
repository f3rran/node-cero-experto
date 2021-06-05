

const socketController = (client) => {
    console.log("Cliente conectado", client.id);
    //client.on('event', data => { /* … */ });
    client.on('disconnect', () => { 
        console.log("Cliente desconectado", client.id);
     });

    client.on('enviar-mensaje', (payload, callback) => {
        //console.log("Recibido mensaje desde el cliente: ", payload);

        const id = '123456';
        callback({id, fecha: new Date().getTime()});

        client.broadcast.emit('enviar-mensaje', payload);
    })
}

module.exports = {
    socketController,
}