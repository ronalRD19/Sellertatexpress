const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    idDescuento: { type: String, required: true },
    categoria: { type: String, required: true },
    valor: { type: String, required: true },
});

module.exports = mongoose.model('descuento', UserSchema);