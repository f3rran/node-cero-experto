const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    //const query = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(parseInt(limite))
    ])
    res.json({
        total,
        usuarios
        //resp
    });
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {
         //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs,bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (put)'
    });
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol});
 
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs,bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.status(201).json({
        ok: true,
        msj: 'Respuesta recibida de la API (post)',
        usuario,
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;
    
    //Físicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Cambiar el estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
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