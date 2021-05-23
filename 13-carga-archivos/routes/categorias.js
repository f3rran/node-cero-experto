const {Router} =require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares');

const { validarCampos, tieneRole } = require('../middlewares');

const {crearCategoria, obtenerCategorias, borrarCategoria, obtenerCategoria, actualizarCategoria} = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener una categoria - publico
router.get('/:id',
    [   check('id', 'No es un id de Mongo válido'),
        check('id').custom(existeCategoria) ]
    , obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearCategoria);

//Actualizar un registor por ID - Cualquiera con token válido
router.put('/:id',
    [validarJWT,
     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('id').custom(existeCategoria),
     validarCampos ], actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT, 
    tieneRole('ADMIN_ROLE'), 
    check('id').custom(existeCategoria) ], borrarCategoria);

module.exports = router;