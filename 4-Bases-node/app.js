const { crearArchivo } = require('./multiplicar/multiplicar');
const argv = require('yargs')
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        default: false
    })
    .check((argv, options) => {
        
        if (isNaN( argv.b)) {
            throw 'La base tiene que ser un número';
        }
        return true;
    })
    .argv;

crearArchivo(argv.b, argv.l)
    .then(archivo =>console.log(`Archivo creado ${archivo}`))
    .catch(e => console.log(e));
