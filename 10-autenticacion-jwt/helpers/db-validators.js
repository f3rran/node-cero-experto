const Role = require('../models/role');
const Usuario = require('../models/usuario');

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
    
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}