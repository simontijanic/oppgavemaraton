const express = require("express");
const app = express();
const routes = require('./routes/default');
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('velkommen');
});

app.listen(3000, () => {
    console.log("listening");
});
