const path = require('path');
const { response } = require("express");
const {subirArchivo} = require('../helpers');
const {Usuario, Producto} = require('../models');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const cargarArchivo = async (req, res = response) => {

    try {
        const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs');

        res.json({
            nombre: nombreArchivo
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }

    
}

const actualizarImagen = async (req, res = response) => {

    const {id, collection} = req.params;

    let modelo;

    switch (collection) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un usuario con el ID proporcionado'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con el ID proporcionado'
                });
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Falta por validar esto'
            })
            break;
    }

    //Limpiar imágenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', collection, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }

    modelo.img = await subirArchivo(req.files, undefined, collection);

    await modelo.save();

    res.json({
        modelo
    })
}

const mostrarImagen = async (req,res = response) => {
    
    const {id, collection} = req.params;

    let modelo;

    switch (collection) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un usuario con el ID proporcionado'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con el ID proporcionado'
                });
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Falta por validar esto'
            })
            break;
    }

    //Recuperar imagen
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', collection, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    res.sendFile(path.join( __dirname, '../assets/no-image.png'));
}

const actualizarImagenCloudinary = async (req, res = response) => {

    const {id, collection} = req.params;

    let modelo;

    switch (collection) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un usuario con el ID proporcionado'
                });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe un producto con el ID proporcionado'
                });
            }
            break;
    
        default:
            return res.status(500).json({
                msg: 'Falta por validar esto'
            })
            break;
    }

    //Limpiar imágenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length -1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    const { tempFilePath } = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;

    await modelo.save();

    res.json({
        modelo
    })
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
}