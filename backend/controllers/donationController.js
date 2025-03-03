const Donation = require("../models/Donation");
const Donor = require("../models/donor");
const Beneficiary = require("../models/beneficiary");
const jwt = require("jsonwebtoken");

const addDonation = async (req, res) => {
  const { debtor_id, amount, payment_method, payment_status } = req.body;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    console.log("Decoded Token:", decodedToken);
    console.log("Request Body:", req.body);

    const donorId = decodedToken.id;

    if (decodedToken.role !== "donor") {
      return res
        .status(403)
        .json({ error: "Access denied. Only donors can create donations." });
    }

    const donor = await Donor.findOne({ where: { user_id: donorId } });
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    const beneficiary = await Beneficiary.findByPk(debtor_id);
    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    const newDonation = await Donation.create({
      donor_id: donor.id,  
      debtor_id,           
      amount,
      payment_method,
      payment_status,     
    });

    console.log("New Donation:", newDonation);

    res.status(201).json(newDonation);
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addDonation,
};
