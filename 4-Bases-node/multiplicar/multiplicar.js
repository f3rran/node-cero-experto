const fs = require('fs');

let crearArchivo = (base) => {
    return new Promise((resolve, reject) => {
        if(!Number(base)){
            reject(`${base} no es un número.`);
            return;
        }
        let datos = '';

        for( let i = 1; i<=10; i++){
            console.log(base*i);
            datos += `${base} * ${i} = ${base*i}`;
            datos += `\n`;
        }
        // directory to check if exists
        const dir = './tablas';

        // check if directory exists
        if (fs.existsSync(dir)) {
            console.log('Directory exists!');
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