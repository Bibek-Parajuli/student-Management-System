const express = require("express");
const router = express.Router();
const User = require("../models/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, role, timest } = req.body;

    // Validate all required fields
    if (!username || !password || !role || !timest) {
      return res.status(400).json({
        error: "All fields are required: username, password, role, and timest.",
      });
    }

    // Validate the role
    if (!["Student", "Admin"].includes(role)) {
      return res.status(400).json({
        error: "Invalid role. Role must be either 'Student' or 'Admin'.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      password: hashedPassword,
      role,
      timest, // Include the timest field
    });

    // Save the user
    await user.save();

    // Send a success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: `Registration failed: ${error.message}` });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: `Login failed: ${error.message}` });
  }
});

module.exports = router;
