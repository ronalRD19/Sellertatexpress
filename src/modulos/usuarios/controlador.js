const usuarios = require('.');
const db = require('../../DB/mysql');
const auth = require('../auth');

const TABLA =  'usuarios';

module.exports = function(dbInyectada) {

    let db = dbInyectada;
        if (!db){
            db = require ('../../DB/mysql');
        }


    function todos (){
        return db.todos(TABLA);
    
    }
    
    function uno (id){
        return db.uno(TABLA, id);
    
    }
    
   async function agregar (body){
        const usuario ={
            id: body.id,
            nombre: body.nombre,
            rol: body.rol
        }

        const respuesta = await db.agregar(TABLA, usuario);
        console.log('respuesta', respuesta)
        var insertId = 0;
        if(body.id == 0){
            insertId = respuesta.insertId;
        }else{
            insertId = body.id;
        }

        var respuesta2 = '';
        if(body.usuario || body.password){
             respuesta2 = await auth.agregar({
                    id: insertId,
                    usuario: body.usuario,
                    password: body.password
                })
        }
        return respuesta2;
    
    }
    
    function eliminar (body){
        return db.eliminar(TABLA, body);
    
    }

    return{ 
    todos,
    uno,
    agregar,
    eliminar,
}

}