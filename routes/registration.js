const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/logout", userController.logoutUser);

router.get("/mongo-world", authController.autentisert, authController.getMongoWorld);

module.exports = router;
