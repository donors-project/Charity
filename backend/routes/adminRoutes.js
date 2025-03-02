const express = require('express');
const router = express.Router();

const {
  getDonorContributions,
  manageBeneficiaryProfiles,
  generateReports,
  getBeneficiaries,
  getSingleBeneficiary,
  getSingleUser,
  getDonors,
  getSingleDonor 
} = require('../controllers/adminController');

router.get('/donations', getDonorContributions);
router.put('/beneficiaries/:id', manageBeneficiaryProfiles);
router.get('/reports', generateReports);
router.get('/beneficiaries', getBeneficiaries);
router.get('/donors', getDonors);
router.get('/donors/:id', getSingleDonor);
// Add single beneficiary route
router.get('/beneficiaries/:id', getSingleBeneficiary);

// **Add single user route** (with admin controller):
router.get('/users/:userId', getSingleUser);
module.exports = router;
