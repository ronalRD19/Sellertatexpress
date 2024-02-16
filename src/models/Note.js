const mongoose = require('mongoose');
const {Schema}= mongoose;

const NoteSchema = new Schema({
    nombreProducto:{type: String, required:true},
    marca:         {type: String, required:true},
    precio:        {type: Number, required:true},
    cantidad:      {type: String, required:true},

});
    module.exports = mongoose.model('Note', NoteSchema);

    