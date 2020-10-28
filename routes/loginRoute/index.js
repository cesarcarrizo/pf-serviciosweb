const express = require("express");
const router = express.Router();


// login
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res) => {
            global.logger(req, res);
            // shows the login page with EJS view engine, this applies for the rests of the router modules
            // cada ves que se ingresa al login cierra la sesion
            global.authId = -1; 
            res.render("pages/loginPage", {alert: false});
        })
        .post(async (req, res) =>{
            global.logger(req, res);
            let data = JSON.parse(JSON.stringify(req.body));
            let autenticacion = await db.autenticacion(data.cedula, data.password);

            if(autenticacion === true){
                // en caso de que sean correctos los datos
                res.redirect('/home');
            }else{
                // de caso contrario envia de nuevo al login pero con una alerta
                res.render('pages/loginPage', {alert: true});
            }
        })

    return router;
};
