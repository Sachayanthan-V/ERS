const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');
const homeController = require('./../controllers/home_controller');

router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.post('/delete/:id', passport.checkAuthentication, usersController.deleteEmp );
router.post('/addrate/:id', passport.checkAuthentication, usersController.addRating );
router.post('/switchAdmin/:id', passport.checkAuthentication, usersController.makeAdmin );
router.post('/updaterating/:id', passport.checkAuthentication, usersController.updateFinalRating );
 
router.get('/', homeController.userHome );
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession); 

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
        'local',
        {failureRedirect : '/users/sign-in'},
    ) , usersController.createSession
);


module.exports = router;