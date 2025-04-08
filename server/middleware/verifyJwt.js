const jwt = require('jsonwebtoken');
const { Auth } = require('../models/studentDetails'); // Your user model
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

  // If there's no token, send a 403 error
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    // Step 1: Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userIdFromToken = decoded.userId;  // Extract the userId from the decoded token payload

    // Step 2: Check if the user exists in the database using the userId from the token
    const user = await Auth.findOne({ _id: userIdFromToken });

    // If no user is found, return an error
    if (!user) {
      return res.status(401).json({ message: 'User not found. Invalid token.' });
    }

    // Step 3: Optionally: Verify the token userId matches the actual logged-in user
    // This could be used to check if the user ID matches the one making the request
    if (req.user && req.user._id !== userIdFromToken) {
      return res.status(403).json({ message: 'Invalid token for this user' });
    }

    // Attach the user to the request for further use
    req.user = user;

    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
