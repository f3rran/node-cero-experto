const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {
    let opt = '';
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        console.log({opt});

        switch (opt) {
            case 1:
                //Buscar ciudad
                //1.- Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                await busquedas.buscarCiudad(lugar);
                //2.- Buscar lugares
                //3.- Seleccionar el lugar
                //4.- Datos del clima
                //5.- Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', );
                console.log('Latitud: ', );
                console.log('Longitud: ', );
                console.log('Temperatura: ', );
                console.log('T. Mínima: ', );
                console.log('T. Máxima: ', );
                break;
            case 2:
                //Historial
                break;
    
        }
        await pausa();
    } while (opt !== 0);
    
}

main();