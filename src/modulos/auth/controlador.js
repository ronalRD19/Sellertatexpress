const TABLA = 'autenticacion';
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const error = require('../../middleware/errors');

module.exports = function (dbInyectada) {

    let db = dbInyectada;
    if (!db) {
        db = require('../../DB/mysql');
    }

    async function login(usuario, password) {
        const data = await db.query(TABLA, { usuario: usuario });
    
        return bcrypt.compare(password, data.password)
        .then(resultado => {
            if(resultado === true){
                return auth.asignarToken({ ...data })
            }
         else {
            throw new Error('Información de inicio de sesión inválida');
        }
    })

}


  async  function agregar(data) {

            const authData ={
                id: data.id,
            }
            if (data.usuario){
                authData.usuario = data.usuario
            }
            if (data.password){
                authData.password = await bcrypt.hash(data.password.toString(), 7);
            }

        return db.agregar(TABLA, authData);

    }



    return {
        agregar,
        login,

    }

}