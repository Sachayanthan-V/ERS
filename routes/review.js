const express = require('express');
const router = express.Router();
// const postsController = require('../controllers/posts_controller');
const passport = require('passport');
const reviewController = require('../controllers/review_controller');

router.post('/create/:id', passport.checkAuthentication , reviewController.reviewHim );
router.get('/check', passport.checkAuthentication, reviewController.check );

module.exports = router;