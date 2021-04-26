//const { mostrarMenu, pausa } = require('./helpers/mensajes');
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer tareas
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
        //console.log({opt});

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                //console.log( tareas._listado);
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //Completado o pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                //console.log(ids);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if (id !== '0') {
                    const confirmacion = await confirmar('¿Estás seguro?')
                    //console.log({id});
                    if (confirmacion) {
                        tareas.borrarTarea( id);
                        console.log('Tarea borrada');
                    }
                }
                
                break;
    
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');
    
    //pausa();
}
    
main();