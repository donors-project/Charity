const express = require('express');
const router = express.Router();

const {
  getDonorContributions,
  manageBeneficiaryProfiles,
  generateReports,
  getBeneficiaries,
  getSingleBeneficiary,
  getSingleUser // <--- import from adminController
} = require('../controllers/adminController');

router.get('/donations', getDonorContributions);
router.put('/beneficiaries/:id', manageBeneficiaryProfiles);
router.get('/reports', generateReports);
router.get('/beneficiaries', getBeneficiaries);

// Add single beneficiary route
router.get('/beneficiaries/:id', getSingleBeneficiary);

// **Add single user route** (with admin controller):
router.get('/users/:userId', getSingleUser);

module.exports = router;
