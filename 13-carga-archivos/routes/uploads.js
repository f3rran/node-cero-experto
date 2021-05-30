const {Router} =require('express');
const { check } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers')
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post('/', validarArchivoSubir,  cargarArchivo);

router.put('/:collection/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de Mongo').isMongoId(),
    check('collection').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);

router.get('/:collection/:id', [
    check('id', 'El id debe de ser de Mongo').isMongoId(),
    check('collection').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;