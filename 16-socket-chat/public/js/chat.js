var url = window.location.hostname.includes("localhost")
  ? "http://localhost:8080/api/auth/google"
  : "https://restserver-curso-fher.herokuapp.com/api/auth/google";

let usuario = null;
let socket = null;

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
}

const main = async () => {
    await validarJWT();
}

main();

const socket = io();