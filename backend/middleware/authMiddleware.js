const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract the token from the header
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is provided, respond with an unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve the user from the database
    req.user = await User.findById(decoded.id).select('-password');
    
    // If the user is not found, return unauthorized error
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Not authorized, token invalid' });
    } else {
      console.error("Token Verification Error:", err); // Log any other errors for debugging
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = authMiddleware;
