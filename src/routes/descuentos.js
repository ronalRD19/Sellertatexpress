const express = require('express');
const { set } = require('mongoose');
const router = express.Router();   'este enrutador nos permite crear rutas del servidor'
const descuento = require('../models/Mdescuentos');
const { isAuthenticated } = require('../helpers/auth');

router.get('/descuentos/add', isAuthenticated ,  (req, res)=>{
    res.render('notes/new-descuento');
  });

  router.post('/descuentos/new-descuentos', isAuthenticated , async (req, res)=>{
    const {idDescuento, categoria, valor}= req.body;
    const errors = [];
    if(!idDescuento){
     errors.push({text:'Porfavor ingrese un idDescuento'});
    }
    if(!categoria){
     errors.push({text: 'Porfavor ingrese una categoria'});
    }
    if(!valor){
      errors.push({text: 'Porfavor ingrese un valor'});
     }




     if (errors.length > 0) {
        res.render('notes/new-descuento', {
          errors,
          idDescuento,
          categoria,
          valor
        });
      } else {
        const newdescuento = new descuento({idDescuento,categoria,valor});
        console.log(newdescuento);
        await newdescuento.save();  
        req.flash('success_msg','Descuento agregado Satisfactoriamente');
        res.redirect('/descuentos');
      }
    });

    router.get('/descuentos',  isAuthenticated , async (req, res) => {
        const descuentos = await descuento.find().lean().sort({date: 'desc'});
        res.render('notes/all-descuentos', {descuentos}); 
     });
     router.get('/descuentos/edit:id' , isAuthenticated , isAuthenticated, async (req, res)=>{
        const descuento = await descuento.findById(req.params.id).lean();
        console.log(descuento);
        res.render('notes/edit-descuentos', {descuento});
      });
    
    
      router.put('/descuentos/edit-descuentos/:id',  isAuthenticated ,  async (req, res)=>{
        const {idDescuento,categoria,valor}= req.body;
        await descuento.findByIdAndUpdate(req.params.id, {idDescuento,categoria,valor});
        req.flash('success_msg','Descuento actualizado satisfactoria');
        res.redirect('/descuentos');
      });
    
      router.delete('/descuentos/delete/:id',  isAuthenticated ,  async (req, res)=>{
        await descuento.findByIdAndDelete(req.params.id);
        req.flash('success_msg','Descuento eliminado satisfactoriamente');
       res.redirect('/descuentos');
    });
    
    module.exports = router;
    