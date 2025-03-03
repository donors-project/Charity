const express = require("express");
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Authentication Routes (Public)
router.post("/signup", upload.single("image"), userController.signup); 
router.post("/signin", userController.signin); // Sign In

// User CRUD Routes (Protected)
router.get("/", authenticate, authorize(["Admin"]), userController.getAllUsers);
router.get("/:id", authenticate, userController.getUserById); 
router.put("/:id", authenticate, userController.updateUser); 
router.delete(
  "/:id",
  authenticate,
  authorize(["Admin"]),
  userController.deleteUser
); 

module.exports = router;