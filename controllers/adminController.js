const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.render("users", { users, message: null, error: null });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.render("users", { users: [], error: "Failed to fetch users", message: null });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    if (req.session.userId === userId) {
      console.error("Cannot delete yourself.");
      return res.render("users", { error: "You cannot delete yourself.", message: null });
    }

    await User.findByIdAndDelete(userId);
    console.log(`User ${userId} deleted.`);
    res.redirect("/api/users");
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).send("Error deleting user.");
  }
};

exports.upgradeUser = async (req, res) => {
  const userId = req.params.id;

  try {
    if (req.session.userId === userId) {
      console.error("Cannot upgrade yourself.");
      return res.render("users", { error: "You cannot upgrade yourself.", message: null });
    }

    await User.findByIdAndUpdate(userId, { role: "admin" });
    console.log(`User ${userId} upgraded to admin.`);
    res.redirect("/api/users");
  } catch (err) {
    console.error("Error upgrading user:", err.message);
    res.status(500).send("Error upgrading user.");
  }
};
