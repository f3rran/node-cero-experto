const Tarea = require('./tarea');
class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = ''){
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    listadoCompleto() {
        let i = 0;
        this.listadoArr.forEach(element => {
            i++;
            console.log(`${i}. ${element.desc} :: ${(!element.completadoEn) ? 'Pendiente'.red : element.completadoEn.green}`)
        });
    }

    listarPendientesCompletadas(completadas = true) {

        let i = 0;
        this.listadoArr.forEach(element => {
            if (completadas) {
                if (element.completadoEn) {
                    i++;
                    console.log(`${i}. ${element.desc} :: ${element.completadoEn.green}`);
                }
                
            }else{
                if (!element.completadoEn) {
                    i++;
                    console.log(`${i}. ${element.desc} :: ${'Pendiente'.red}`);
                }
            }
            
        });
    }

    toggleCompletadas(ids = []){

        ids.forEach( id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;