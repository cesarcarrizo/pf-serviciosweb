const express = require("express");
const router = express.Router();

// login
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res, next) => {
            // shows the login page
            res.render("pages/loginPage");
            next();
        }, (req, res) => {
            console.log('Petición Get @ /login hecha por '+ req.headers.host);
        });

    return router;
};
