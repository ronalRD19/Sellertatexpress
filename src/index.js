const app = require('./app'); // Importa el módulo de la aplicación desde './app'

app.listen(app.get('port'), ()=>{ // Inicia el servidor y lo hace escuchar en el puerto definido en la configuración de la aplicación.
    console.log("Servidor escuchando en el puerto", app.get("port"));
});