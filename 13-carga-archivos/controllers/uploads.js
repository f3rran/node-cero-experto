const { response } = require("express");


const cargarArchivo = (req, res = response) => {

    res.json({
        msg: 'ASDASDAS'
    })
}

module.exports = {
    cargarArchivo
}