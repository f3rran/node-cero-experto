var url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/google"
  : "https://restserver-curso-fher.herokuapp.com/api/auth/google";

let usuario = null;
let socket = null;

//Referencias HTML
const txtUid     = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir   = document.querySelector('#btnSalir');

//Validar token del localstorage
const validarJWT = async() => {
    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const res = await fetch( url, {
        headers: { 'x-token': token}
    });

    const { usuario: userDB, token: tokenDB} = await res.json();
    //console.log(userDB, tokenDB);

    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conetarSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log("Sockets online");
    });

    socket.on('disconnect', () => {
        console.log("Sockets offline");
    });

    socket.on('recibir-mensajes', dibujarMensajes);
    socket.on('usuarios-activos', dibujarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log('Privado: ', payload);
    });
}

const dibujarUsuarios = (usuarios = []) => {
    
    let usersHtml = '';
    usuarios.forEach( ({nombre, uid}) => {
        
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success"> ${nombre} </h5>
                    <span class="fs-6 text-muted"> ${uid} </span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = usersHtml;
}

txtMensaje.addEventListener('keyup', ({keyCode}) => {
    
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;

    if (keyCode !== 13) return;
    if (mensaje.length === 0) return;

    socket.emit('enviar-mensaje', {mensaje, uid});

    txtMensaje.value = '';

});

const dibujarMensajes = (mensajes = []) => {
    
    let mensajesHtml = '';
    mensajes.forEach( ({nombre, mensaje}) => {
        
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary"> ${nombre} </span>
                    <span> ${mensaje} </span>
                </p>
            </li>
        `;
    });

    ulMensajes.innerHTML = mensajesHtml;
}

const main = async () => {
    await validarJWT();
}

main();
