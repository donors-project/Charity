const Donation = require("../models/donation");

const Donor = require("../models/donor");
const Beneficiary = require("../models/beneficiary");

const getUserDonations = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from URL

    const donations = await Donation.findAll({
      include: {
        model: Donor,
        attributes: [], // Exclude donor fields if not needed
        where: { user_id: userId },
      },
    });

    res.status(200).json(donations);
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.status(500).json({ message: "Error retrieving donations" });
  }
};
const getUserAds = async (req, res) => {
  try {
    const userId = req.params.id;

    const ads = await Beneficiary.findOne({
      where: { user_id: userId }, // البحث عن السجل بواسطة user_id
    });
    if (!ads) {
      return res
        .status(404)
        .json({ message: "No record found for this user_id" });
    }

    res.status(200).json(ads);
  } catch (err) {
    console.error("Error fetching donations:", err);
    res.status(500).json({ message: "Error retrieving donations" });
  }
};

module.exports = { getUserDonations, getUserAds };
