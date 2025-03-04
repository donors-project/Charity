// ----------------------------------------
// IMPORTS
// ----------------------------------------
const express = require('express'),
      router = express.Router(),
      {
        getDonorContributions,
        manageBeneficiaryProfiles,
        generateReports,
        getBeneficiaries,
        getSingleBeneficiary,
        getSingleUser,
        getDonors,
        getSingleDonor,
        createUserAndBeneficiary,
        getContactUsMessages,   
      } = require('../controllers/adminController'),
      
      upload = require('../middlewares/uploadMiddleware'),

      { authenticate, authorize } = require('../middlewares/authMiddleware');

      
// ----------------------------------------
// ROUTES: Donations
// ----------------------------------------
router.get('/donations', authenticate, authorize(['Admin']), getDonorContributions);



// ----------------------------------------
// ROUTES: Beneficiaries
// ----------------------------------------
router.put('/beneficiaries/:id', manageBeneficiaryProfiles),
router.get('/beneficiaries', getBeneficiaries),
router.get('/beneficiaries/:id', getSingleBeneficiary);


// ----------------------------------------
// ROUTES: Donors
// ----------------------------------------
router.get('/donors', getDonors),
router.get('/donors/:id', getSingleDonor);


// ----------------------------------------
// ROUTES: Reports
// ----------------------------------------
router.get('/reports', generateReports);


// ----------------------------------------
// ROUTES: User Management
// ----------------------------------------
router.get('/users/:userId', getSingleUser);


// ----------------------------------------
// ROUTES: User & Beneficiary Creation
// ----------------------------------------
router.post('/create', authenticate, authorize(['Admin']), upload.single('identity_image'), createUserAndBeneficiary);


// ----------------------------------------
// ROUTES: Contact Messages
// ----------------------------------------
router.get('/contact-us', authenticate, authorize(['Admin']), getContactUsMessages);


// ----------------------------------------
// ROUTES: Admin Verification
// ----------------------------------------
router.get('/verify-admin', authenticate, (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "Forbidden! You don't have permission." });
  }
  res.status(200).json({ role: req.user.role });
});


module.exports = router;
