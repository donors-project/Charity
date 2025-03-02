const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET; // Use JWT_SECRET for better consistency

// Middleware to verify JWT Token
const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied! No valid token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    console.error("Authentication error:", error.message); // Log error for debugging
    return res.status(403).json({ message: "Unauthorized access!" });
  }
};

// Middleware for role-based access control
const authorize = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res
      .status(403)
      .json({ message: "Forbidden! You don't have permission." });
  }
  next();
};

module.exports = { authenticate, authorize };
