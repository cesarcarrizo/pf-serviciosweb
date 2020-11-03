const express = require("express");
const router = express.Router();

// hacemos la exportacion como una funcion para posteriormente agregar el modulo del DB
// home
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get(async (req, res) => {
            global.logger(req, res);
            // shows the login page
            if(global.authId === -1){
                res.send('<h1>Acceso no autorizado, por favor iniciar sesión!</h1>');
            } else {
                global.__guest = await db.guest(global.authId);
                // enviamos la vista como respuesta junto con la data de la base de datos
                res.render('pages/homePage');
            }
        });

    return router;
};
