const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAutentisert } = require("../controllers/authController");

router.get("/users", adminAutentisert, adminController.getUsers);

router.post("/users/:id/delete", adminAutentisert, adminController.deleteUser);

router.post("/users/:id/upgrade", adminAutentisert, adminController.upgradeUser);

module.exports = router;
