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
    const user_id = req.user.id;
    const { total_debt, reason, category } = req.body;

    // Get the uploaded image URL from Cloudinary
    const identity_image = req.file ? req.file.path : null;

    const beneficiary = await Beneficiary.create({
      user_id,
      total_debt,
      remaining_debt: total_debt, // Always equal to total_debt
      reason,
      identity_image,
      category,
      verified: null,
    });

    res
      .status(201)
      .json({ message: "Beneficiary registered successfully", beneficiary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating beneficiary" });
  }
};

module.exports = { getAllAds, createBeneficiary };
