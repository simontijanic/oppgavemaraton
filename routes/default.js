const express = require("express");
const router = express.Router();

const greeting = require("../models/greeting");
const User = require("../models/user");

router.get("/helloworld", async (req, res) => {
  try {
    res.redirect(`http://10.12.14.251/helloworld`);
  } catch (err) {
    console.log(errr);
  }
});

function autentisert(req, res, next) {
  if (req.session.userId) {
    return next();
  } else {
    res.redirect("/index");
  }
}

function adminAutentisert(req, res, next) {
  if (req.session.userId && req.session.userId.role === "admin") {
    return next();
  }
  res.status(403).send("Access denied. Admins only.");
}

router.get("/users", adminAutentisert, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.render("users", { users });
  } catch (err) {
    console.error(err);
  }
});

router.post("/users/:id/delete", adminAutentisert, async (req, res) => {
  const userId = req.params.id;

  try {
    if (req.session.userId === userId) {
      console.error("slette deg selv?");
    }

    await User.findByIdAndDelete(userId);
    console.log("slettet");

    res.redirect("/api/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user.");
  }
});

router.post("/users/:id/upgrade", adminAutentisert, async (req, res) => {
    const userId = req.params.id;
  
    try {
      if (req.session.userId === userId) {
        console.error("upgrade deg selv?");
      }
  
      await User.findByIdAndUpdate(userId, { role: 'admin' });
      console.log("upgradaa");
  
      res.redirect("/api/users");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting user.");
    }
  });

router.get("/mongo-world", autentisert, async (req, res) => {
  try {
    const greetings = await greeting.find();

    res.render("mongo", { greetings });
  } catch (err) {
    console.log(err);
  }
});

router.get("/galleri", autentisert, async (req, res) => {
  try {
    res.render("galleri");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
