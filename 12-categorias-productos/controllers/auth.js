const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const login = async (req, res = response ) => {

    const {correo, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no válidos - correo'
            })
        }
        //Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - estado: false'
            })
        }
        //Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/Contraseña no son correctos - password'
            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login ok',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignin = async(req, res = response) => {

    const {id_token} = req.body;
    try {
        const {correo, nombre, img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            //Se tiene que crear
            const data = {
                nombre,
                correo,
                img,
                password: ':P',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //S el usuario en DB 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloquerado, hable con el administrador'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        
        res.json({
            usuario, token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }

    
}

module.exports = {
    login,
    googleSignin
}