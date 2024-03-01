// Importación de módulos
const express = require('express'); // Importa el módulo 'express' para crear la aplicación
const config = require('./config.js'); // Importa la configuración de la aplicación
const morgan = require('morgan');
// Importación de las rutas de clientes
const clientes = require('./modulos/clientes/rutas.js');
const usuarios = require('./modulos/usuarios/rutas');
const auth = require('./modulos/auth/rutas.js');
const error = require('./red/errors.js');


// Creación de la aplicación Express
const app = express(); // Crea una instancia de la aplicación Express

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//configuracion 
// Configuración del puerto
app.set('port', config.app.port) // Configura el puerto en el que la aplicación escuchará

// Definición de las rutas
    //rutas
app.use('/api/clientes', clientes); // Define la ruta base para las rutas relacionadas con los clientes
app.use('/api/usuarios', usuarios) ;
app.use('/api/auth', auth);


app.use(error);

// Exportación de la aplicación
module.exports = app;  // Exporta la instancia de la aplicación Express