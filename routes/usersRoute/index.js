const express = require('express');
const router = express.Router();

module.exports = (db) => {

    router.route("/")
        .get(async (req, res) =>{
            global.logger(req, res);
            if(global.authId === -1){
                res.send('<h1>Acceso no autorizado, por favor iniciar sesión!</h1>');
            } else {
                let guestData = await db.usuarios();

                console.dir(guestData);

                // enviamos la vista como respuesta junto con la data de la base de datos
                res.render('pages/usersPage')// FIX;
            }
        })

    return router;
};