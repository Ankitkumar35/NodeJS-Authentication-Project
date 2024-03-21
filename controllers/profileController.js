// profileController.js
const bcrypt=require('bcrypt')
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = req.user; // Access the logged-in user's profile information
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio, phone, password } = req.body;
    const user = req.user; // Access the logged-in user's profile information

    // Update user's profile details in the database
    if(name)
    user.name=name;
    if(bio)
    user.bio=bio;
if(phone)
user.phone=phone;
if(password)
{   
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password=hashedPassword;
}

    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadProfilePhoto = async (req, res) => {
  try {
    const user = req.user; // Get the authenticated user

    // Check if the request contains a file
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save the URL of the uploaded image to the user's profile
    user.photo = req.file.path; // Assuming 'path' contains the URL of the uploaded image
    await user.save();

    res.json({ message: 'Profile photo uploaded successfully', imageUrl: req.file.path });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfilePrivacy = async (req, res) => {
    try {
      const { isProfilePublic } = req.body;
      const user = req.user; // Get the authenticated user
  
      // Update the profile privacy settings
      user.isProfilePublic = isProfilePublic;
      await user.save();
  
      res.json({ message: 'Profile privacy settings updated successfully', isProfilePublic });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getUserProfile = async (req, res) => {
    try {
      const user = req.user; // Get the authenticated user
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getPublicUserProfiles = async (req, res) => {
    try {
      const publicProfiles = await User.find({ isProfilePublic: true }).select('-password'); // Find all public profiles
      res.json(publicProfiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getAllUserProfiles = async (req, res) => {
    try {
      const user = req.user; // Get the authenticated user
      if (!user.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
  
      const allProfiles = await User.find().select('-password'); // Find all profiles (excluding passwords)
      res.json(allProfiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

