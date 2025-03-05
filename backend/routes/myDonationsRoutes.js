const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  getUserAds,
  getUserDonations,
} = require("../controllers/myDonationsController");
const router = express.Router();

router.get("/:id/donations", authenticate, getUserDonations);
router.get("/:id/ads", authenticate, getUserAds);

module.exports = router;
