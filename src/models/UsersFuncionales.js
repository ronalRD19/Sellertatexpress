const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nit: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    zona: { type: String, required: true },
    contacto: { type: String, required: true },
    descuento: { type: String, required: true },
    FechaIngreso: { type: String, required: true }
});

module.exports = mongoose.model('Cliente', UserSchema);
