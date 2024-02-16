const express = require('express');
const router = express.Router();   'este enrutador nos permite crear rutas del servidor'
const User = require('../models/Users');
const passport= require('passport')

router.get('/users/signin', (req, res)=> {

    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/about',
    failureRedirect: '/users/signin',
    failureFlash: true

}));

router.get('/users/signup', (req, res)=> {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res)=>{
    const {name, email, password, confirm_password} = req.body;
    const errors = []
    console.log(req.body);

  if(name.length <= 0 ){
        errors.push({text: 'porfavor inserte un nombre'});
  }
  
  if(password != confirm_password){
    errors.push({text:'Las contraseñas no coinciden'});
  }

  if(password.length < 4){
    errors.push({text:'la contraseña debe de ser almenos de 4 caracteres'});
  }

  if(errors.length > 0){
    res.render('users/signup',{errors,name, email, password, confirm_password });
  }else{
      
       const emailUsers = await User.findOne({email: email});
       if(emailUsers){
        req.flash('error_msg', 'El email está ya en uso');
        res.redirect('/users/signup');
       }
      const newUser = new User({name, email, password}); //igual que en las notas
      newUser.password= await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg','Estas registrado');
      res.redirect('/about');
  }

});


router.get("/users/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;