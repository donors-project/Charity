const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware"); // Import auth middleware
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Authentication Routes (Public)
router.post("/signup", upload.single("image"), userController.signup);
router.post("/signin", userController.signin); // Sign In

// User CRUD Routes (Protected)
router.get("/", authenticate, authorize(["Admin"]), userController.getAllUsers); // Only Admin can view all users
router.get("/:id", authenticate, userController.getUserById); // Any logged-in user can view their own data
router.put("/:id", authenticate, userController.updateUser); // Any logged-in user can update their data
router.delete(
  "/:id",
  authenticate,
  authorize(["Admin"]),
  userController.deleteUser
); // Only Admin can delete users

module.exports = router;