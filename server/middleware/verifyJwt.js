const jwt = require('jsonwebtoken');
const JWT_SECRET = "mynameisbibek112";  // Same secret used when signing the token

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // Attach decoded user info to request
    next();  // Proceed to next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
