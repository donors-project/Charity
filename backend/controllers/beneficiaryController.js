const Beneficiary = require("../models/beneficiary");

const getAllAds = async (req, res) => {
  try {
    const ads = await Beneficiary.findAll({
      where: { user_id: req.params.id },
    });
    if (!ads || ads.length === 0) {
      console.log("There are no beneficiaries to show");
      return res.status(404).json({ message: "No beneficiaries found" });
    }
    res.status(200).json(ads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving beneficiaries" });
  }
};

const createBeneficiary = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Uploaded File:", req.file);

    const { debt_amount, debt_reason, category } = req.body;
    if (!debt_amount || !debt_reason || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      return res.status(400).json({ message: "Identity image is required." });
    }

    const newBeneficiary = await Beneficiary.create({
      total_debt: debt_amount,
      remaining_debt: debt_amount,
      reason: debt_reason,
      category,
      identity_image: imageUrl,
      user_id: req.user.id,
      verified: null,
    });

    return res.status(201).json({
      message: "Beneficiary registered successfully",
      beneficiary: newBeneficiary,
    });
  } catch (error) {
    console.error("Error in createBeneficiary:", error);
    return res.status(500).json({
      message: "Failed to register beneficiary.",
      error: error.message,
    });
  }
};

module.exports = { getAllAds, createBeneficiary };
