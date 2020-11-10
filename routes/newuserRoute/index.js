const express = require('express');
const router = express.Router();

//crear nuevo usuario
module.exports = (db) => {
    
    router.route("/")
        .get(async (req, res) =>{
            global.logger(req, res);
            if(global.authId === -1){
                res.send('<h1>Acceso no autorizado, por favor iniciar sesión!</h1>');
            } else {
                res.render('pages/newuserPage');
            }
        })
        .post(async (req, res) => {
            global.logger(req, res);
            let data = JSON.parse(JSON.stringify(req.body));
            if(data.passwd === data.passwdConf){
                // procede a hacer la insercion
                await db.crearUsuario(data.cedula, data.nombreComp, data.nuevoUsuario, data.passwd, data.email, data.pregunta, data.respuesta);
                console.log(`USUARIO ${data.nuevoUsuario} CREADO EN LA BASE DE DATOS test_db.`);
                res.redirect("/users");
            }
            if(data.passwd !== data.passwdConf){
                //quede aca
                res.render("pages/homePage");
            }
        });
    
    return router;
};