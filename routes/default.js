const express = require("express");
const router = express.Router();
const greeting = require("../models/greeting");

router.get("/helloworld", async (req, res) => {
  try {
    res.redirect(`http://10.12.14.251/helloworld`);
  } catch (err) {
    console.log(errr);
  }
});

router.get("/mongo-world", async (req, res) => {
  try {
    const greetings = await greeting.find();

    res.render("mongo", { greetings });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
