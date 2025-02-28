const express = require('express');
const router = express.Router();

const {
  getDonorContributions,
  manageBeneficiaryProfiles,
  generateReports,
  getBeneficiaries 
} = require('../controllers/adminController');

router.get('/donations', getDonorContributions);
router.put('/beneficiaries/:id', manageBeneficiaryProfiles);
router.get('/reports', generateReports);
router.get('/beneficiaries', getBeneficiaries);

module.exports = router;
