const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.error("User already exists");
      return res.render("index", { error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.render("index", { message: "User created successfully" });
  } catch (err) {
    console.error("Error during registration:", err.message);
    return res.render("index", { error: "An error occurred. Please try again." });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error("User not found");
      return res.render("index", { error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Incorrect password");
      return res.render("index", { error: "Invalid username or password" });
    }

    req.session.userId = { id: user._id, username: user.username, role: user.role };

    return res.redirect("/api/mongo-world");
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.render("index", { error: "An error occurred. Please try again." });
  }
};

exports.logoutUser = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout failed:", err.message);
        return res.render("index", { error: "Failed to log out. Please try again." });
      }
      res.render("index", { message: "Successfully logged out" });
    });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.render("index", { error: "An error occurred. Please try again." });
  }
};
