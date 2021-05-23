const jwt = require('jsonwebtoken');
const {response, request } = require('express');

const Usuario = require('../models/usuario');


const validarJWT = async ( req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).useChunkedEncodingByDefault({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        }

        //Comprobar si el usuario no ha sido borrado
        if (!usuario.estado) {
            return res.status(401).useChunkedEncodingByDefault({
                msg: 'Token no válido - Usuario con estado false'
            });
        }

        req.usuario = usuario;
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
    console.log(token);

    next();
}

module.exports = {
    validarJWT
}