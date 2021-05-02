const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;
    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (get) Controlador',
        query
    });
}

const usuariosPut =  (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (put)'
    });
}

const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.status(201).json({
        ok: true,
        msj: 'Respuesta recibida de la API (post)',
        body,
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (delete)'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (patch)'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}