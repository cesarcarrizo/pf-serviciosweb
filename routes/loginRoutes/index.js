const express = require("express");
const router = express.Router();

// login
module.exports = (db) => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res, next) => {
            // shows the login page with EJS view engine, this applies for the rests of the router modules
            res.render("pages/loginPage");
            next();
        }, (req, res) => {
            console.log('Petición Get @ /login hecha por '+ req.headers.host);
        })
        .post((req, res)=>{
            let data = JSON.parse(JSON.stringify(req.body));
            let authentication = false;
            // quede aca
            console.log(data);
            res.redirect('/login');
        })

    return router;
};
