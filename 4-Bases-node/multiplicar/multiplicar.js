const fs = require('fs');
const colors = require('colors');

const crearArchivo = (base, listar = false, hasta = 10) => {
    return new Promise((resolve, reject) => {
        if(!Number(base)){
            reject(`${base} no es un número.`);
            return;
        }
        if(!Number(hasta)){
            reject(`El argumento -h no es un número válido.`);
            return;
        }
        let datos = '';
        try {
            if (listar) {
                console.log("======================");
                console.log('     Tabla del:'.green, colors.blue(base) );
                console.log("======================");
            }
            for( let i = 1; i<=hasta; i++){
                if (listar) {
                    console.log(`     ${base} * ${i} = ${base*i}`);
                }           
                datos += `${base} * ${i} = ${base*i}`;
                datos += `\n`;
            }
        } catch (error) {
            console.log(error);
        }
        
        // directory to check if exists
        const dir = './tablas';

        // check if directory exists
        if (fs.existsSync(dir)) {
            //console.log('Directory exists!');
        } else {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        fs.writeFile(`./tablas/tabla-${base}.txt`, datos, (err) => {
            if(err) 
                reject(err);
            else
                resolve(`tabla-${base}.txt`);
        });
    });
}

module.exports = {
    crearArchivo
}