const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

// Route to add a new donation (for both PayPal and Cliq)
router.post("/donations", donationController.addDonation);

module.exports = router;
