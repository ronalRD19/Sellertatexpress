const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require ('express-session');
const Handlebars = require('handlebars');
const flash = require ('connect-flash');
const passport = require ('passport');



//Initializations

const app = express();
require('./database');
require('./config/passport');


//seccion de configuracion settings: aqui ira todas nuestras configuraciones
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); // el metodo join me permite unir directorios.
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'),'layouts'),
  partilsDir: path.join(app.get('views'),'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs'); 

//Middlewares: que es en donde iran todos nuunestras funsiones que van a ser ejecutadas antes de que lleguen al servidor, o cuando llenguen al servidro antes que pasarselo a las rutas

app.use(express.urlencoded({extended:false})); // Este metodo sirve para que luego que un formulario quiera enviarme determinado dato, yo pueda entenderlo
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave:true,
  saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global Variables: para poder colocar sietos datos que toda la aplicacion tenga accesible.

 app.use((req, res, next)=>{
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user= req.user || null;
   next();
 });


//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use(require('./routes/clientes'));
app.use(require('./routes/bodegas'));
app.use(require('./routes/descuentos'));

//Static files: para configurar en donde estara la carpeta de archivos estaticos

app.use(express.static(path.join(__dirname, 'public')));

//Server is listennig: Luego finalmente para iniciar nuestro servidor

app.listen(app.get('port'), () =>{  //con esto ya puedo iniciar mi servidor
 console.log('Server on port', app.get('port'))
});


