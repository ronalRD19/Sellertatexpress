const express = require('express');
const { set } = require('mongoose');
const router = express.Router();   'este enrutador nos permite crear rutas del servidor'
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated ,  (req, res)=>{
  res.render('notes/new-notes');
});
/* */

router.post('/notes/new-note', isAuthenticated , async (req, res)=>{
  const {nombreProducto, marca, precio,cantidad, descripcion}= req.body;
  const errors = [];
  if(!nombreProducto){
   errors.push({text:'Porfavor ingrese un producto'});
  }
  if(!marca){
   errors.push({text: 'Porfavor ingrese una marca'});
  }
  if(!precio){
    errors.push({text: 'Porfavor ingrese una precio'});
   }

   if(!cantidad){
    errors.push({text: 'Porfavor ingrese una la cantidad del producto'});
   }

  if (errors.length > 0) {
    res.render('notes/new-notes', {
      errors,
      nombreProducto,
      marca,
      precio,
      cantidad,
      descripcion
    });
  } else {
    const newNote = new Note({nombreProducto,marca,precio,cantidad, descripcion});
    await newNote.save();
    req.flash('success_msg','Producto agregado Satisfactoriamente');
    res.redirect('/notes');
  }
});

router.get('/notes',  isAuthenticated , async (req, res) => {
   const notes = await Note.find().lean().sort({date: 'desc'});
   res.render('notes/all-notes', { notes }); 
   

});
router.get('/notes/edit:id', isAuthenticated , isAuthenticated , async (req, res)=>{
  const note = await Note.findById(req.params.id).lean();
  console.log(note);
  res.render('notes/edit-note', { note });
});

router.put('/notes/edit-note/:id',  isAuthenticated ,  async (req, res)=>{
  const {nombreProducto, marca, precio,cantidad, descripcion}= req.body;
  await Note.findByIdAndUpdate(req.params.id, { nombreProducto,marca,precio,cantidad, descripcion});
  req.flash('success_msg','Nota actualizada satisfactoria');
  res.redirect('/notes');

});

router.delete('/notes/delete/:id',  isAuthenticated ,  async (req, res)=>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Producto eliminado satisfactoriamente');
   res.redirect('/notes');
});


module.exports = router;