const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Importing JWT
const { Auth } = require("../models/studentDetails");
require('dotenv').config()

// Register User
const registerUser = async (req, res) => {
  const { fullName, email, password, confirmPassword, role } = req.body;
  try {
    // Check if the user already exists
    console.log('called');
    
    const userExists = await Auth.findOne({ email: email });
    if(!(password === confirmPassword)){
       return res.status(409).json({message:'Please check password field'})
    }
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    if (!fullName || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Hash the password
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res
          .status(401)
          .json({ message: "Error while hashing and stoing and database" });
      }
      const addUser = new Auth({
        email,
        fullName,
        password: hash, // Store the hashed password, not the plain one
        role,
      });
      await addUser.save();

      return res.status(201).json({ message: "User registered successfully" });
    });

    // Save the new user to the database
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while registering user" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await Auth.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // Use environment variable for secret
      { expiresIn: "1h" }
    );

    // Return token to the user
    return res.status(201).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during login" });
  }
};


module.exports = { registerUser, loginUser };
