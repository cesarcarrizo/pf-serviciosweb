const express = require("express");
const router = express.Router();

// login
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res, next) => {
            // shows the login page with EJS view engine, this applies for the rests of the router modules
            // cada ves que se ingresa al login cierra la sesion
            global.authId = -1; 
            res.render("pages/loginPage");
            next();
        }, (req, res) => {
            console.log('Petición GET @ /login hecha por '+ req.headers.host);
        })
        .post(async (req, res, next) =>{
            let data = JSON.parse(JSON.stringify(req.body));
            let autenticacion = await db.autenticacion(data.cedula, data.password);

            if(autenticacion === true){
                res.redirect('/home');
            }else{
                res.redirect('/login');
            }
            
            next();
        }, (req, res) =>{
            console.log('Petición POST @ /login hecha desde '+ req.headers.origin);
        })

    return router;
};
