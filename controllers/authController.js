const greeting = require("../models/greeting");
const xss = require('xss');

exports.autentisert = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/index");
};

exports.adminAutentisert = (req, res, next) => {
  if (req.session.userId && req.session.userId.role === "admin") {
    return next();
  }
  res.status(403).send("Access denied. Admins only.");
};

exports.getMongoWorld = async (req, res) => {
    try {
      const greetings = await greeting.find();
  
      const sanitizedGreetings = greetings.map((g) => ({
        message: xss(g.message || ""),
      }));
        
      res.render("mongo", { greetings: sanitizedGreetings });
    } catch (err) {
      console.error("Error fetching greetings:", err.message);
      res.render("mongo", { greetings: [], error: "Failed to load greetings" });
    }
  };
  