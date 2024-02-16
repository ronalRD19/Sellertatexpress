const express = require('express');
const { set } = require('mongoose');
const router = express.Router();   'este enrutador nos permite crear rutas del servidor'
const Cliente = require('../models/UsersFuncionales');
const { isAuthenticated } = require('../helpers/auth');

router.get('/clientes/add', isAuthenticated ,  (req, res)=>{
    res.render('notes/new-cliente');
  });


  router.post('/clientes/new-clientes', isAuthenticated , async (req, res)=>{
    const {nit, nombre, direccion,zona, contacto,descuento, FechaIngreso}= req.body;
    const errors = [];
    if(!nit){
     errors.push({text:'Porfavor ingrese un producto'});
    }
    if(!nombre){
     errors.push({text: 'Porfavor ingrese una marca'});
    }
    if(!direccion){
      errors.push({text: 'Porfavor ingrese una precio'});
     }
     if(!zona){
      errors.push({text: 'Porfavor ingrese la zona'});
     }
     if(!contacto){
        errors.push({text: 'Porfavor ingrese el contacto'});
       }
       if(!descuento){
        errors.push({text: 'Porfavor ingrese el documento'});
       }
       if(!FechaIngreso){
        errors.push({text: 'Porfavor ingrese la Fecha de ingreso'});
       }
  
     


    if (errors.length > 0) {
      res.render('notes/new-cliente', {
        errors,
        nit,
        nombre,
        direccion,
        zona,
        contacto,
        descuento,
        FechaIngreso
      });
    } else {
      const newcliente = new Cliente({nit,nombre,direccion,zona, contacto,descuento,FechaIngreso});
      console.log(newcliente);
      await newcliente.save();  
      req.flash('success_msg','Cliente agregado Satisfactoriamente');
      res.redirect('/clientes');
    }
  });

  router.get('/clientes',  isAuthenticated , async (req, res) => {
    const clientes = await Cliente.find().lean().sort({date: 'desc'});
    res.render('notes/all-clientes', {clientes}); 
 });
 router.get('/clientes/edit:id' , isAuthenticated , async (req, res)=>{
    const cliente = await Cliente.findById(req.params.id).lean();
    console.log(cliente);
    res.render('notes/edit-clientes', {cliente});
  });


  router.put('/clientes/edit-clientes/:id',  isAuthenticated ,  async (req, res)=>{
    const {nit, nombre, direccion,zona, contacto,descuento,FechaIngreso}= req.body;
    await Cliente.findByIdAndUpdate(req.params.id, {nit,nombre,direccion,zona, contacto,descuento,FechaIngreso});
    req.flash('success_msg','Cliente  actualizado satisfactoria');
    res.redirect('/clientes');
  });

  router.delete('/clientes/delete/:id',  isAuthenticated ,  async (req, res)=>{
    await Cliente.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Cliente eliminado satisfactoriamente');
   res.redirect('/clientes');
});

module.exports = router;

