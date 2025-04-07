const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  // Importing JWT
const { Auth } = require("../models/studentDetails");

const JWT_SECRET = "mynameisbibek112^*^&%^%";  // Secret key for signing the JWT. Change this to something secure.

// Register User
const registerUser = async (req, res) => {
  const {fullName, email, password,confirmPassword,role } = req.body;
  try {
    // Check if the user already exists
    const userExists = await Auth.findOne({ email: email });
    // if(!password === confirmPassword){
    //     res.status(401).json({message:'Please check password field'})
    // }
    if (userExists) {
      return res.status(401).json({ message: "User already exists" });
    }
if (!fullName || !email || !password || !confirmPassword || !role) {
  res.status(400).json({message:'All fields are required'})
  
}
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const addUser = new Auth({
      email,
      fullName,
      password: hashedPassword, // Store the hashed password, not the plain one
    });
    await addUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error while registering user" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
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

    const token = jwt.sign(
      { userId: user._id, email: user.email },  
      JWT_SECRET,  
      { expiresIn: '1h' }  
    );

    return res.status(200).json({
      message: "Login successful",
      token,  
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { registerUser, loginUser };
