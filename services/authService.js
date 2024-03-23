const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Register with email and password
exports.registerWithEmailPassword = async ({ email, password }) => {
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("Email is already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    user = new User({ email, password: hashedPassword });
    user.googleId = email;
    await user.save();
    console.log("user registered");
    return user;
  } catch (err) {
    throw err;
  }
};

// Login with email and password
exports.loginWithEmailPassword = async ({ email, password }) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });
    console.log("Login Successful");
    return token;
  } catch (err) {
    throw err;
  }
};

exports.loginOrSignUp = async (email) => {
  try {
    // Check if the user already exists in the database based on the email address
    let user = await User.findOne({ email });
    if (user) {
      // User exists, perform login process
      console.log("User exists, performing login");
      // Perform login logic here
    } else {
      // User does not exist, create a new user record in the database
      console.log("User does not exist, signing up");

      // Create a new user record with the provided email addre
      user = new User({ email, password: await bcrypt.hash("12345678", 10)});
      user.googleId = email;
      await user.save();

      // Perform login logic here
    }

    // Return user data or authentication token
    return user; // Or return authentication token if applicable
  } catch (error) {
    console.error("Error in loginOrSignUp:", error);
    throw error;
  }
};
