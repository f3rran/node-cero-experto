const { Categoria, Role, Usuario, Producto } = require('../models');

const esRoleValido = async (rol = '')=> {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error('El rol no existe o no es válido')
    }
}

const emailExiste = async (email = '') => {

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne(email);
    if(existeEmail){
        throw new Error('El correo electrónico ya está registrado')
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El usuario no existe');
    }
}

const existeCategoria = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error('La categoría no existe');
    }
}

const existeProducto = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error('El producto no existe');
    }
}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = (collection = '', colecciones = []) => {

    const incluida = colecciones.includes(collection);
    if (!incluida) {
        throw new Error('La colección no está permitida');
    }
}
    
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas

}