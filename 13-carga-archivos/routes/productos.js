const {Router} =require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares');

const { validarCampos, tieneRole } = require('../middlewares');

const {crearProducto, obtenerProductos, borrarProducto, obtenerProducto, actualizarProducto} = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/Productos
 */

//Obtener todas las Productos - publico
router.get('/', obtenerProductos);

//Obtener una Producto - publico
router.get('/:id',
    [   check('id', 'No es un id de Mongo válido'),
        check('id').custom(existeProducto) ]
    , obtenerProducto);

//Crear Producto - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearProducto);

//Actualizar un registor por ID - Cualquiera con token válido
router.put('/:id',
    [validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('id').custom(existeProducto),
     validarCampos ], actualizarProducto);

//Borrar una Producto - Admin
router.delete('/:id', [
    validarJWT, 
    tieneRole('ADMIN_ROLE'), 
    check('id').custom(existeProducto) ], borrarProducto);

module.exports = router;