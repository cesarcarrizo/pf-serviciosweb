/* MAIN SERVER */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
//const db = require('./db');

const router = require("./routes");

const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";

const app = express();

// check this for security stuff
app.set("trust proxy", 1);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/static", express.static(path.join(__dirname, "./resources")));


app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor escuchando por peticiones en ${localhost}:${PORT}`);
    //let data = db.test();
    //console.log(typeof data);
});
