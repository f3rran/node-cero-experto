const { response,request } = require("express");
const { Categoria } = require('../models');

//obtenerCategorias - paginado - total - populate(Mongoose)
const obtenerCategorias = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(parseInt(limite))
    ])
    res.json({
        total,
        categorias
    });
}

//obtenerCategoria - populate{}
const obtenerCategoria = async (req = request, res = response) => {
    const id = req.params.id;
    const categoria = await Categoria.findById(id);

    res.json({
        categoria
    })
}


const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria)
}

// actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const id = req.params.id;
    const { _id, estado, usuario, ...resto } = req.body;

    const categoriaDB = await Categoria.findById(id);

    if (!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} no existe`
        });
    }

    if (!resto.nombre) {
        return res.status(400).json({
            msg: 'No se ha proporcionado un nombre válido'
        });
    }

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (put)',
        categoriaDB
    });
}

//borrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {

    const { id } = req.params;
    
    //Físicamente lo borramos
    //const categoria = await Categoria.findByIdAndDelete(id);

    //Cambiar el estado
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    borrarCategoria,
    actualizarCategoria
}