const express = require("express");
const router = express.Router();

// home
module.exports = () => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res) => {
            // shows the login page
            res.render("pages/loginPage");
        });

    return router;
};
