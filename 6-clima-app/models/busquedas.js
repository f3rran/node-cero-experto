const axios = require('axios');

class Busquedas {

    historial = ['Madrid', 'Barcelona'];

    constructor() {
        // TODO: Leer DB si existe
    }

    async buscarCiudad(lugar = ''){

        try {
            const instance = axios.create({

                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                    'access_token': 'pk.eyJ1IjoiZjNycmFuIiwiYSI6ImNrbnl0c2FmZjEzcDQyd3RnNWN3a3Uwcm8ifQ.bOjZX3RfAbZysioP_88ysg',
                    'limit': 5,
                    'language': 'es'
                }
            });

            const resp = instance.get();
            console.log(resp.data);

            return []; //Retornar las ciudades que coincidan
        } catch (error) {
            return []; //Retornar las ciudades que coincidan
        }
        //const resp = await axios.get()
        
    }
}

module.exports = Busquedas;