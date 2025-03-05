const express = require("express");
const beneficiaryController = require("../controllers/beneficiaryController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.get("/:id", authenticate, beneficiaryController.getAllAds);

router.post(
  "/",
  authenticate,
  upload.single("identity_image"),
  beneficiaryController.createBeneficiary
);

module.exports = router;
