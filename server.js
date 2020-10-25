/* MAIN SERVER */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require('./db');

// route modules
const homeRouter = require("./routes/homeRoutes");
const loginRouter = require("./routes/loginRoutes");

const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";

const app = express();

// check this for security stuff
app.set("trust proxy", 1);

app.set("view engine", "ejs");// Embedded Java Script
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/static", express.static(path.join(__dirname, "./resources")));


app.use("/home", homeRouter(db));
app.use("/login", loginRouter(db));

app.listen(PORT, async () => {
    console.log(`Servidor escuchando por peticiones en ${localhost}:${PORT}`);
    //console.dir(await db.test());
});
