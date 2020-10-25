const express = require("express");
const router = express.Router();

// hacemos la exportacion como una funcion para posteriormente agregar el modulo del DB
// home
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get(async (req, res) => {
            // shows the login page
            if(global.authId === -1){
                res.send('<h1>Acceso no autorizado, por favor iniciar sesión!</h1>');
            } else {
                let guestData = await db.guest(global.authId);
                console.log(guestData); 
                res.render('pages/homePage');
            }
        });

    return router;
};
