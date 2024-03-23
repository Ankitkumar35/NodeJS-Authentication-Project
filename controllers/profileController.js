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
    console.log("1");
    let imagePath;
    if (req.file) {
      // const timestamp = Date.now();
      const originalFilename = req.file.originalname;
      console.log("2");
      const ext = path.extname(originalFilename);
      // const uniqueFilename = `${timestamp}_${originalFilename}`;
      console.log("3");
      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      console.log("4");
      const filePath = path.join(uploadDir, originalFilename);
      console.log("6");

      console.log(originalFilename);
      // fs.readFileSync(filePath);
      // Set the image path to the unique filename
      imagePath = originalFilename;
      user.photo = imagePath;
      await user.save();
    } else if (req.body.imageUrl) {
      // If a URL is provided, save it directly
      imagePath = req.body.imageUrl;
      user.photo = imagePath;
      await user.save();
    } else {
      return res.status(400).send("No image uploaded or URL provided");
    }

    // Update the user's profile photo field in MongoDB

    res.json({
      message: "Profile photo uploaded successfully",
      photoUrl: imagePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading profile photo.");
  }
};
exports.uploadPhotos = async (req, res) => {
  try {
    const user = req.user;
    console.log("1");
    let imagePath;
    if (req.file) {
      // const timestamp = Date.now();
      const originalFilename = req.file.originalname;
      console.log("2");
      const ext = path.extname(originalFilename);
      // const uniqueFilename = `${timestamp}_${originalFilename}`;
      console.log("3");
      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      console.log("4");
      const filePath = path.join(uploadDir, originalFilename);
      console.log("6");

      console.log(originalFilename);
      // fs.readFileSync(filePath);
      // Set the image path to the unique filename
      imagePath = originalFilename;
      user.photosuploaded.push(...imagePath);

      await user.save();

      res.json({ message: "Photos uploaded successfully", photos: photoUrls });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
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
