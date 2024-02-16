const mongoose = require('mongoose');
const {Schema}= mongoose;

const NoteSchema = new Schema({
    nitBodega:   {type: String, required:true},
    nombreBodega:{type: String, required:true},
    direccionBodega:   {type: String, required:true},
});
    module.exports = mongoose.model('Bodegas', NoteSchema);