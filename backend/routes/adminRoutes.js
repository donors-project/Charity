// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const {
  getDonorContributions,
  manageBeneficiaryProfiles,
  generateReports,
  getBeneficiaries 
} = require('../controllers/adminController');

// Dashboard: Get Donor Contributions
router.get('/donations', getDonorContributions);

// Manage Beneficiary Profiles: Approve or Update
router.put('/beneficiaries/:id', manageBeneficiaryProfiles);

// Reporting System: Data-driven Insights
router.get('/reports', generateReports);

// Add a route to get all beneficiaries
router.get('/beneficiaries', getBeneficiaries);

module.exports = router;
