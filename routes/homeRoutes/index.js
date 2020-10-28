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
                //console.log(guestData);

                // enviamos la vista como respuesta junto con la data de la base de datos
                res.render('pages/homePage', {data: {
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
        });

    return router;
};
