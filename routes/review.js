const express = require('express');
const router = express.Router();

const passport = require('passport');
const reviewController = require('../controllers/review_controller');

router.post('/create/:id', passport.checkAuthentication , reviewController.reviewHim );

module.exports = router;