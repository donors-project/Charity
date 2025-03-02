const express = require('express');
const router = express.Router();
const {getTopDonors,} = require('../controllers/topDonorController');
  

// Get all Donors
router.get('/donor', getTopDonors);

module.exports = router;

