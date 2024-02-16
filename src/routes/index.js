const express = require('express');
const router = express.Router();   'este enrutador nos permite crear rutas del servidor'

router.get('/', (req, res) => {
    res.render('index');
}); //Cuando visiten la pagina principal de mi aplicacion vas a manejarlo con una funsion que maneje las funsiones, y las respuestas, y lo que vas a enviar por ahora es simplemente un mensaje que diga idex, esta es la pagina inicial de mi aplicacion 
              //Luego lo vamos a remplazar por un archivo, pero por ahora lo vamos a manejar de esa manera.

router.get('/about', (req, res) => {
    res.render('about');

});

module.exports = router;