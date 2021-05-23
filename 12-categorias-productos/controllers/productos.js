const { response,request } = require("express");
const { Producto } = require('../models');

//obtenerProductos - paginado - total - populate(Mongoose)
const obtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(parseInt(limite))
    ])
    res.json({
        total,
        productos
    });
}

//obtenerProducto - populate{}
const obtenerProducto = async (req = request, res = response) => {
    const id = req.params.id;
    const producto = await Producto.findById(id);

    res.json({
        producto
    })
}


const crearProducto = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }

    //Generar datos a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto)
}

// actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const id = req.params.id;
    const { _id, estado, usuario, ...resto } = req.body;

    const productoDB = await Producto.findById(id);

    if (!productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} no existe`
        });
    }

    if (!resto.nombre) {
        return res.status(400).json({
            msg: 'No se ha proporcionado un nombre válido'
        });
    }

    resto.nombre = resto.nombre.toUpperCase();
    resto.usuario = req.usuario._id;

    await Producto.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        msj: 'Respuesta recibida de la API (put)',
        productoDB
    });
}

//borrarProducto - estado:false
const borrarProducto = async (req, res = response) => {

    const { id } = req.params;
    
    //Físicamente lo borramos
    //const producto = await Producto.findByIdAndDelete(id);

    //Cambiar el estado
    const producto = await Producto.findByIdAndUpdate(id, {estado: false});

    res.json(producto);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    borrarProducto,
    actualizarProducto
}