// profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/multer');
router.use(authMiddleware.authenticateUser);

router.get('/me', profileController.getUserProfile);

router.put('/me', profileController.updateUserProfile);

router.post('/me/photo', profileController.uploadProfilePhoto);

router.put('/me/privacy', profileController.updateProfilePrivacy);

router.get('/public', profileController.getPublicUserProfiles);

router.get('/', profileController.getAllUserProfiles);

router.post('/photos', authMiddleware.authenticateUser, uploadMiddleware.array('photos'), profileController.uploadPhotos);


module.exports = router;