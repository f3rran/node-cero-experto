const { crearArchivo } = require('./multiplicar/multiplicar');
const {argv} = require('./config/yargs');
const colors = require('colors');

crearArchivo(argv.b, argv.l, argv.h)
    .then(archivo =>console.log('Archivo creado', archivo.green))
    .catch(e => console.log(e));
