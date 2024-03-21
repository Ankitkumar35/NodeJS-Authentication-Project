// authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, config.jwtSecret);

    // Check if the user exists
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user object to the request for further use in controllers
    req.user = user;

    next(); // Call the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  // Check if the user is an admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  next(); // Call the next middleware or route handler
};
