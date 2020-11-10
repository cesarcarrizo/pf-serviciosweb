const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.route("/")
        .get(async (req, res) =>{
            global.logger(req, res);
            if(global.authId === -1){
                res.send('<h1>Acceso no autorizado, por favor iniciar sesión!</h1>');
            } else {
                //global.__users = await db.usuarios();
                //console.dir(users);
                
                //let users = await db.usuarios();
                // enviamos la vista como respuesta junto con la data de la base de datos
                res.render('pages/consecutivoPage');
            }
        })

    return router;
};