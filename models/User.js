// User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    unique: true
  },
  // Additional profile-related fields
  name: {
    type: String
  },
  bio: {
    type: String
  },
  phone: {
    type: String
  },
  photo: {
    type: String // URL of the user's profile photo
  },
  // Privacy settings
  isProfilePublic: {
    type: Boolean,
    default: true // Set to true by default (public profile)
  },
  // Add other fields as needed for user profile
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
