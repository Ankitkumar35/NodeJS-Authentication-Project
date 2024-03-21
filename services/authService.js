const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Register with email and password
exports.registerWithEmailPassword = async ({ email, password }) => {
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new Error('Email is already registered');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    user = new User({ email, password: hashedPassword });
    await user.save();
    console.log('user registered')
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
      throw new Error('Invalid email or password');
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
    console.log("Login Successful");
    return token;
  } catch (err) {
    throw err;
  }
};

// Google OAuth2 Strategy
passport.use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      // Create a new user with Google profile data
      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        // Additional profile fields can be extracted from the `profile` object if needed
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });

    done(null, token);
  } catch (err) {
    done(err);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initialize Passport
exports.initPassport = () => {
  passport.initialize();
};
