const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User= require('../models/User')
router.post('/register', authController.register);
router.post('/login', authController.loginWithEmailPassword);
router.get('/login/google', authController.loginWithGoogle);
router.post('/logout', authController.logout);

router.get('/users',(req,res)=>{
    // res.json(User);
    res.send("hi")
})

module.exports = router;
