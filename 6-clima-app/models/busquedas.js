const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalziado(){
        //Capitalziar los registros
        this.historial.forEach((element, j) => {
            var splitStr = element.split(' ');
            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
            splitStr = splitStr.join(' ');
            this.historial[j] = splitStr;
        });
        return this.historial;
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async buscarCiudad(lugar = ''){

        try {
            const instance = axios.create({

                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],

            })); //Retornar las ciudades que coincidan
        } catch (error) {
            return []; //Retornar las ciudades que coincidan
        }
        //const resp = await axios.get()
        
    }

    async climaLugar( lat, lon){

        try {
            const instance = axios.create({

                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    'lat':lat,
                    'lon':lon,
                    'appid':process.env.OPENWEATHER_KEY,
                    'units':'metric',
                    'lang':'es'
                }
            });

            const resp = await instance.get();

           // console.log(resp.data);

            return{
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp:  resp.data.main.temp,
            }; 

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = ''){
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this,historial.splice(0,5);
        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en db/archivo de textp
        this.guardarDB();

    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){

        //Debe de existir la DB
        if (fs.existsSync(this.dbPath)) {
            const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} );
            const data = JSON.parse(info);

            this.historial = data.historial;
        }
        
    }
}

module.exports = Busquedas;