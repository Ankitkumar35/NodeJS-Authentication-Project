// authMiddleware.js

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;

    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
