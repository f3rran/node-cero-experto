const { crearArchivo } = require('./multiplicar/multiplicar');
const {argv} = require('./config/yargs');

crearArchivo(argv.b, argv.l)
    .then(archivo =>console.log(`Archivo creado ${archivo}`))
    .catch(e => console.log(e));
