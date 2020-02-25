const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesario']
    },
    img: {
        type: String,
        required: false
    }, //no es obligatoria
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    }, //Boolean
    google: {
        type: Boolean,
        default: false
    } //Boolean
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} DEBE DE SER UNCIO' })

module.exports = mongoose.model('Usuario', usuarioSchema)