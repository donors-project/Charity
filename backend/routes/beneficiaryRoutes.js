const express = require("express");
const beneficiaryController = require("../controllers/beneficiaryController"); // Import user controller
const router = express.Router();

// Get all users
router.get("/:id", beneficiaryController.getAllAds);

module.exports = router;
