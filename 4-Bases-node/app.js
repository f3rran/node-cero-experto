//Importaciones del propio Node
//const fs = require('fs');
//Importaciones de paquetes de terceros. 
//const exp = require('express');
//Importaciones desde el propio proyecto
//const asd = require('./componente');
const { crearArchivo } = require('./multiplicar/multiplicar');

let argv = process.argv;
let base = argv[2].split('=',)[1];

crearArchivo(base)
    .then(archivo =>console.log(`Archivo creado ${archivo}`))
    .catch(e => console.log(e));
