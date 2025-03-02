const Donor = require('../models/donor');
const User = require('../models/user');

// Get all donors with user names
exports.getDonors = async (req, res) => {
    try {
        console.log("Fetching all Donors with User Information");

        const donors = await Donor.findAll({
            include: [
                {
                    model: User,  
                    attributes: ['id', 'full_name'], 
                    as: 'user'  // Make sure this matches the association in Sequelize
                }
            ],
            order: [['total_donated', 'DESC']], // Order by highest donations
        });

        console.log("Fetched Donors:");
        res.status(200).json(donors);
    } catch (error) {
        console.error("Error fetching Donors:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
