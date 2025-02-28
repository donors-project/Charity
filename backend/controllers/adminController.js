const Donation = require('../models/donation');
const Beneficiary = require('../models/beneficiary');
const Donor = require('../models/donor');
const User = require('../models/user');

const { Op } = require('sequelize');

exports.getDonorContributions = async (req, res) => {
    try {
        console.log("Fetching donor contributions...");
        const donations = await Donation.findAll({
            include: [
                { model: Donor, attributes: ['id', 'total_donated'] },
                { model: Beneficiary, attributes: ['id', 'total_debt'] },
            ],
            attributes: ['amount', 'payment_method', 'payment_status', 'payment_date'],
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
