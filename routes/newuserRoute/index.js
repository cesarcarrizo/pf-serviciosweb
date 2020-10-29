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
                let guestData = await db.guest(global.authId);
                //console.log(guestData);

                // enviamos la vista como respuesta junto con la data de la base de datos
                res.render('pages/newuserPage', {data: {
                    cedula_usu_pk: guestData.cedula_usu_pk,
                    nombre_comp_usu: guestData.nombre_comp_usu,
                    user_usu: guestData.user_usu,
                    passwd_usu: guestData.passwd_usu,
                    email_usu: guestData.email_usu,
                    pregunta_usu: guestData.pregunta_usu,
                    respuesta_usu: guestData.respuesta_usu,
                    ep_safe_code_usu: guestData.ep_safe_code_usu,
                    ep_pass_usu: guestData.ep_pass_usu,
                    rol_usu: guestData.rol_usu,
                  }});
            }
        })
        .post(async (req, res) => {
            global.logger(req, res);
            let data = JSON.parse(JSON.stringify(req.body));
            if(data.passwd === data.passwdConf){
                // procede a hacer la insercion
                await db.crearUsuario(data.cedula, data.nombreComp, data.nuevoUsuario, data.passwd, data.email, data.pregunta, data.respuesta);
                console.log('USUARIO CREADO EN LA BASE DE DATOS test_db.');
                return res.send("usuario agregado con exito.");
            }else{
                //quede aca

            }
        });
    
    return router;
};