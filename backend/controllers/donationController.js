const Donation = require("../models/Donation");
const Donor = require("../models/donor");
const Beneficiary = require("../models/beneficiary");
const jwt = require("jsonwebtoken"); // For decoding the token

// Function to add a new donation
const addDonation = async (req, res) => {
  const { debtor_id, amount, payment_method, payment_status } = req.body; // Use debtor_id as per the model

  try {
    // Extract the token from the header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"
    if (!token) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    // Decode the token to get the payload
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    // Extract the donor_id from the token payload (using the `id` field)
    const donor_id = decodedToken.id; // Updated to use `id` instead of `donor_id`

    // Check if the user is a donor
    if (decodedToken.role !== "donor") {
      return res
        .status(403)
        .json({ error: "Access denied. Only donors can create donations." });
    }

    // Check if donor exists
    const donor = await Donor.findByPk(donor_id);
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    // Check if beneficiary exists
    const beneficiary = await Beneficiary.findByPk(debtor_id); // Use debtor_id as per the model
    if (!beneficiary) {
      return res.status(404).json({ error: "Beneficiary not found" });
    }

    // Create a new donation
    const newDonation = await Donation.create({
      donor_id,
      debtor_id, // Use debtor_id as per the model
      amount,
      payment_method,
      payment_status,
    });

    res.status(201).json(newDonation);
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addDonation,
};
