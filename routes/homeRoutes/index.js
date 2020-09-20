const express = require("express");
const router = express.Router();

// HOME
module.exports = () => {

    // create routing modules for each specific URI
    router.route("/")
        .get((req, res) => {
            res.send("get setted succesfully");
        });

    return router;
};
