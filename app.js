const express = require("express");
const path = require("path");
const app = express();
const routes = require('./routes/default');

app.use('/api', routes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(3000, () => {
    console.log("listening");
});
