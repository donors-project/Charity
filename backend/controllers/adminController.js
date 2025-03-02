// admin.controller
const Donation = require('../models/donation');
const Beneficiary = require('../models/beneficiary');
const Donor = require('../models/donor');
const User = require('../models/user');

const { Op } = require('sequelize');


// adminController.js
exports.getSingleUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { id: userId } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.getDonorContributions = async (req, res) => {
    try {
        console.log("Fetching donor contributions...");
        const donations = await Donation.findAll({
            include: [
                { model: Donor, attributes: ['id', 'total_donated'] },
                { model: Beneficiary, attributes: ['id', 'total_debt'] },
            ],
            attributes: ['amount','donor_id', 'payment_method', 'payment_status', 'payment_date'],
            order: [['payment_date', 'DESC']]
        });
        console.log("Fetched donations:", donations);

        // Convert to plain object
        const plainDonations = donations.map(donation => donation.get({ plain: true }));
        res.status(200).json(plainDonations);

    } catch (error) {
        console.error("Error fetching donations:", error.message);  
        console.error(error.stack); 
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Get single beneficiary details
exports.getSingleBeneficiary = async (req, res) => {
    try {
      const { id } = req.params;
      const beneficiary = await Beneficiary.findOne({
        where: { id },
      });
  
      if (!beneficiary) {
        return res.status(404).json({ message: "Beneficiary not found" });
      }
  
      res.status(200).json(beneficiary);
    } catch (error) {
      console.error("Error fetching beneficiary:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

exports.getBeneficiaries = async (req, res) => {
    try {
        console.log("Fetching all beneficiaries...");
        const beneficiaries = await Beneficiary.findAll();  
        console.log("Fetched beneficiaries:", beneficiaries);
        res.status(200).json(beneficiaries);
    } catch (error) {
        console.error('Error fetching beneficiaries:', error.message);
        console.error(error.stack); 
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Manage Beneficiary: Approve, Update
exports.manageBeneficiaryProfiles = async (req, res) => {
    const { id } = req.params;
    const { verified, total_debt, remaining_debt, reason } = req.body;

    try {
        const beneficiary = await Beneficiary.findByPk(id);

        if (!beneficiary) {
            return res.status(404).json({ message: 'Beneficiary not found' });  // Return 404 if beneficiary does not exist
        }

        // Update beneficiary
        beneficiary.verified = verified ?? beneficiary.verified;
        beneficiary.total_debt = total_debt ?? beneficiary.total_debt;
        beneficiary.remaining_debt = remaining_debt ?? beneficiary.remaining_debt;
        beneficiary.reason = reason ?? beneficiary.reason;

        await beneficiary.save(); 

        res.status(200).json(beneficiary);  
    } catch (error) {
        console.error('Error updating beneficiary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reporting System
exports.generateReports = async (req, res) => {
    const { startDate, endDate, donorId, beneficiaryId } = req.query;

    try {
        const filters = {};

        if (startDate && endDate) {
            filters.created_at = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        if (donorId) {
            filters.donor_id = donorId;
        }

        if (beneficiaryId) {
            filters.debtor_id = beneficiaryId;
        }

        const donations = await Donation.findAll({
            where: filters,
            include: [
                { model: Donor, attributes: ['id', 'total_donated'] },
                { model: Beneficiary, attributes: ['id', 'total_debt'] },
            ],
            attributes: ['amount', 'payment_method', 'payment_status', 'payment_date'],
            order: [['payment_date', 'DESC']],
        });

        const totalDonations = donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);

        res.status(200).json({
            totalDonations,
            donations,
        });
    } catch (error) {
        console.error('Error generating reports:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.generateReports = async (req, res) => {
    const { startDate, endDate, donorId, beneficiaryId } = req.query;
  
    try {
      const filters = {};
  
      // 1) Date range
      if (startDate && endDate) {
        filters.payment_date = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      } else if (startDate) {
        filters.payment_date = {
          [Op.gte]: new Date(startDate),
        };
      } else if (endDate) {
        filters.payment_date = {
          [Op.lte]: new Date(endDate),
        };
      }
  
      // 2) Donor filter
      if (donorId) {
        filters.donor_id = donorId;
      }
  
      // 3) Beneficiary filter
      if (beneficiaryId) {
        filters.debtor_id = beneficiaryId;
      }
  
      // Query the donation table
      const donations = await Donation.findAll({
        where: filters,
        attributes: [
          'id',
          'amount',
          'payment_method',
          'payment_status',
          'payment_date',
        ],
        order: [['payment_date', 'DESC']],
      });
  
      // Compute stats
      let totalCount = 0;
      let totalAmount = 0.0;
      let completedCount = 0;
      let pendingCount = 0;
      let failedCount = 0;
  
      donations.forEach((don) => {
        totalCount++;
        totalAmount += parseFloat(don.amount) || 0;
        if (don.payment_status === 'Completed') completedCount++;
        else if (don.payment_status === 'Pending') pendingCount++;
        else if (don.payment_status === 'Failed') failedCount++;
      });
  
      const averageAmount = totalCount ? (totalAmount / totalCount).toFixed(2) : 0;
  
      // Summarize results
      const summary = {
        totalCount,
        totalAmount: totalAmount.toFixed(2),
        averageAmount,
        completedCount,
        pendingCount,
        failedCount,
      };
  
      res.status(200).json({
        donations,
        summary,
      });
    } catch (error) {
      console.error('Error generating reports:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getDonors = async (req, res) => {
    try {
      const donors = await Donor.findAll({
        attributes: ['id', 'user_id', 'total_donated'],
        include: [
          {
            model: User,
            attributes: ['full_name', 'email', 'address', 'phone']
          }
        ]
      });
      res.status(200).json(donors);
    } catch (error) {
      console.error("Error fetching donors:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // donorController.js
exports.getSingleDonor = async (req, res) => {
  const donorId = req.params.id;
  const donor = await Donor.findByPk(donorId);
  if (!donor) {
    return res.status(404).json({ message: 'Donor not found' });
  }
  res.status(200).json(donor);
};
