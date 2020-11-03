/* MAIN SERVER */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require('./db');

// route modules
const homeRouter = require("./routes/homeRoute");
const loginRouter = require("./routes/loginRoute");
const newuserRouter = require('./routes/newuserRoute');
const usersRouter = require("./routes/usersRoute");

const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";

const app = express();

// aca se almacena la data para el guest una vez loggeado para no tener que irla pasando de modulo en modulo
global.logger = (req, res) => {
    let client = req.headers.host;
    let route = req.baseUrl;
    let meth = req.method;
    return console.log(`Petición ${meth} @ ${route} hecha por ${client}`);
};

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
app.use("/newuser", newuserRouter(db));
app.use("/users", usersRouter(db));


app.get("/", (req, res)=>{
   res.redirect("/login"); 
});

app.listen(PORT,  () => {
    console.log(`Servidor escuchando por peticiones en ${localhost}:${PORT}`);
    //
    //let guestData = await db.usuarios();
    //console.dir(guestData);
    global.__guest = {};
    //global.__users = [];
    global.authId = -1;
    
});
