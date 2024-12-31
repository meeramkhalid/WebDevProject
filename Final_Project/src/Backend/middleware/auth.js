const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Protect routes (authentication middleware)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      console.log("protect func");

      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to the request
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const checkRole = (role) => (req, res, next) => {
  console.log("role: ", role);
  console.log("Checking roles");
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Admin-only authorization
const checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  console.log("admin logged in");

  next();  // Allow request to proceed to the route handler
};

module.exports = { protect, checkRole, checkAdmin };


