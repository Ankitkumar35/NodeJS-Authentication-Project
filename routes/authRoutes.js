const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const User= require('../models/User')
router.post('/register', authController.register);
router.post('/login', authController.loginWithEmailPassword);
router.post('/logout', authController.logout);

router.get('/login/google', authController.loginWithGoogle);

router.get('/google/callback', authController.googleCallback);
  

module.exports = router;
