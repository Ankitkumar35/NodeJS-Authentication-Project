// profileController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");
exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = req.user;
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio, phone, password } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;

    if (email) {
      const isEmail = User.findOne({ email });
      if (isEmail) {
        console.log("User already registed");
      } else user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadProfilePhoto = async (req, res) => {
  try {
    const user = req.user;

    let imagePath;
    if (req.file) {
      const timestamp = Date.now();
      const originalFilename = req.file.originalname;
      const ext = path.extname(originalFilename);
      const uniqueFilename = `${timestamp}_${originalFilename}${ext}`;

      const uploadDir = path.join(__dirname, "../ProfilePhoto");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, req.file.buffer);

      // Set the image path to the unique filename
      imagePath = filePath;
    } else if (req.body.imageUrl) {
      // If a URL is provided, save it directly
      imagePath = req.body.imageUrl;
    } else {
      return res.status(400).send("No image uploaded or URL provided");
    }

    // Update the user's profile photo field in MongoDB
    user.photo = imagePath;
    await user.save();

    res.json({
      message: "Profile photo uploaded successfully",
      photoUrl: imagePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading profile photo.");
  }
};

exports.updateProfilePrivacy = async (req, res) => {
  try {
    const { isProfilePublic } = req.body;
    const user = req.user; // Get the authenticated user

    // Update the profile privacy settings
    user.isProfilePublic = isProfilePublic;
    await user.save();
    console.log("Privacy Upated");
    res.json({ message: "Profile privacy settings updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPublicUserProfiles = async (req, res) => {
  try {
    const publicProfiles = await User.find({ isProfilePublic: true }).select(
      "-password"
    );
    res.json(publicProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllUserProfiles = async (req, res) => {
  try {
    const user = req.user;
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const allProfiles = await User.find().select("-password");
    res.json(allProfiles);
  } catch (err) {
    res.status(500).json({ message: "Authorized token missing" });
  }
};

exports.uploadPhotos = async (req, res) => {
  try {
    const user = req.user;

    // Check if the request contains photos
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const photoUrls = req.files.map((file) => file.path.toString()); // Convert file paths to strings

    // Update the photosuploaded field in the user schema
    user.photosuploaded.push(...photoUrls);

    await user.save();

    res.json({ message: "Photos uploaded successfully", photos: photoUrls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
