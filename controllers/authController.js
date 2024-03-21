const authService = require('../services/authService');


exports.register = async (req, res) => {
  try {
    const user = await authService.registerWithEmailPassword(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginWithEmailPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginWithEmailPassword({ email, password });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.loginWithGoogle = async (req, res) => {
  try {
    // Redirect user to Google OAuth2 authentication page
    res.redirect('/auth/google');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout= async (req, res) => {
    try {
      // Clear token from client-side (e.g., delete from cookies or local storage)
      res.clearCookie(req.body.token); // Example: clearing JWT cookie
  
      res.json({ message: 'Logout successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  