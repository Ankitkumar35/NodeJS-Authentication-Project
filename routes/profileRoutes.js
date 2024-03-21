// profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middleware to authenticate user
router.use(authMiddleware.authenticateUser);

// Route to get user's profile details
router.get('/me', profileController.getUserProfile);

// Route to update user's profile details
router.put('/me', profileController.updateUserProfile);

// Route to upload user's profile photo
router.post('/me/photo', profileController.uploadProfilePhoto);

// Route to make user's profile public or private
router.put('/me/privacy', profileController.updateProfilePrivacy);

// Route to get public user profiles (accessible to normal users)
router.get('/public', profileController.getPublicUserProfiles);

// Route to get all user profiles (accessible to admin users)
router.get('/', authMiddleware.authorizeAdmin, profileController.getAllUserProfiles);

module.exports = router;