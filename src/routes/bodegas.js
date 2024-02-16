const express = require('express');
const { set } = require('mongoose');
const router = express.Router();   'este enrutador nos permite crear rutas del servidor'
const Bodegas = require('../models/Bodegas');
const { isAuthenticated } = require('../helpers/auth');

router.get('/bodegas/add', isAuthenticated ,  (req, res)=>{
    res.render('notes/new-bodega');
  });


  router.post('/bodegas/new-bodegas', isAuthenticated , async (req, res)=>{
    const {nitBodega,nombreBodega,direccionBodega}= req.body;
    const errors = [];
    if(!nitBodega){
     errors.push({text:'Porfavor ingrese el Nit de la bodega'});
    }
    if(!nombreBodega){
     errors.push({text: 'Porfavor ingrese el nombre de la bodega'});
    }
    if(!direccionBodega){
      errors.push({text: 'Porfavor ingrese la direccion de la bodega'});
     }

    if (errors.length > 0) {
      res.render('notes/new-bodega', {
        errors,
        nitBodega,
        nombreBodega,
        direccionBodega,
      });
    } else {
      const newbodegas = new Bodegas({nitBodega,nombreBodega,direccionBodega});
      console.log(newbodegas);
      await newbodegas.save();  
      req.flash('success_msg','Bodega agregada Satisfactoriamente');
      res.redirect('/bodegas');
      
    }
  });

  router.get('/bodegas',  isAuthenticated , async (req, res) => {
    const bodegas = await Bodegas.find().lean().sort({date: 'desc'});
    res.render('notes/all-bodegas', {bodegas}); 
 });
 router.get('/bodegas/edit:id' , isAuthenticated , async (req, res)=>{
    const bodega = await Bodegas.findById(req.params.id).lean();
    console.log(bodega);
    res.render('notes/edit-bodegas', {bodega});
  });


  router.put('/bodegas/edit-bodegas/:id',  isAuthenticated ,  async (req, res)=>{
    const {nitBodega,nombreBodega,direccionBodega}= req.body;
    await Bodegas.findByIdAndUpdate(req.params.id, {nitBodega,nombreBodega,direccionBodega});
    req.flash('success_msg','Bodega  actualizada satisfactoria');
    res.redirect('/bodegas');



  });

  router.delete('/bodegas/delete/:id',  isAuthenticated ,  async (req, res)=>{
    await Bodegas.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Bodega eliminada satisfactoriamente');
   res.redirect('/bodegas');
});

module.exports = router;