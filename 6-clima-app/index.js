const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
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
                const terminoBusqueda = await leerInput('Ciudad: ');
                //2.- Buscar lugares
                const lugares = await busquedas.buscarCiudad(terminoBusqueda);
                //3.- Seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares);
                if (idSeleccionado === '0') {
                    continue;
                }
                //Guardar en DB
                const lugarSeleccionado = lugares.find( l => l.id === idSeleccionado);
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                //4.- Datos del clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)
                //5.- Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Latitud: ', lugarSeleccionado.lat);
                console.log('Longitud: ', lugarSeleccionado.lng);
                console.log('Temperatura: ',clima.temp+" ºC" );
                console.log('T. Mínima: ', clima.min+" ºC");
                console.log('T. Máxima: ', clima.max+" ºC");
                console.log('Descripción clima: ', clima.desc);
                break;
            case 2:
                //Historial
                busquedas.historialCapitalziado.forEach( (lugar,i) => {
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
    
        }
        await pausa();
    } while (opt !== 0);
    
}

main();