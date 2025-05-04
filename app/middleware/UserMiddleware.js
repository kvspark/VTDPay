const jwt = require('jsonwebtoken');
const { User } = require('../../models');
require('dotenv').config()




const JWT_SECRET = process.env.JWT_SECRET ; // Make sure to set a secret key in environment variables

// Middleware to verify JWT token
const userMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ success: false, message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Token is not valid.' });
  }
};

module.exports = { userMiddleware };
