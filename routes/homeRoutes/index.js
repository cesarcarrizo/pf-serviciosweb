const express = require("express");
const router = express.Router();

// hacemos la exportacion como una funcion para posteriormente agregar el modulo del DB
// home
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res) => {
            // shows the login page
            res.send(global.authId);
        });

    return router;
};
