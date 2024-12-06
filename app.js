const express = require("express");
const path = require("path");
const app = express();
const routes = require('./routes/default');
const registration = require('./routes/registration');
const xprsssession = require('express-session');

const dbHandler = require("./handlers/dbHandler")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(xprsssession({
    secret: 'KEY',
    resave: false,
    saveUninitialized: true,
  }));
  

app.get('/', (req, res) => {
    res.render("index");
});

app.use('/api', routes);
app.use(registration);

app.listen(3000, () => {
    console.log("listening");
    dbHandler();
});
