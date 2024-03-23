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
    default: " "
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
  photosuploaded:{
    type:[{String}]
  },
  // Privacy settings
  isProfilePublic: {
    type: Boolean,
    default: true // Set to true by default (public profile)
  },
  isAdmin:{
    type: Boolean,
    default: false
  }
  // Add other fields as needed for user profile
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
