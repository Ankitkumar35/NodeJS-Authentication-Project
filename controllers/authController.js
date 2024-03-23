const authService = require("../services/authService");
const request = require("request");
const axios = require("axios");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();

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

exports.loginWithGoogle = (req, res) => {
  const redirectUri = "http://localhost:3000/auth/google/callback";
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.clientID}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;

  res.redirect(authUrl);
};

exports.googleCallback = async (req, res) => {
  const code = req.query.code;

  const redirectUri = "http://localhost:3000/auth/google/callback";
  const clientId =process.env.clientID;

  const clientSecret = process.env.clientSecret;

  const tokenUrl = process.env.tokenURL;
  const auth = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  )}`;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: auth,
  };
  const postData = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
  request.post(
    { url: tokenUrl, headers: headers, body: postData },
    async (err, response, body) => {
      if (err) {
        console.error("Error retrieving access token:", err);
        res.redirect("/login");
      } else {
        const accessToken = JSON.parse(body).access_token;
        // You can use the accessToken to make requests to Google APIs or get user information

        const getUserEmail = async (accessToken) => {
          try {
            const response = await axios.get(
              "https://www.googleapis.com/oauth2/v1/userinfo",
              {
                params: {
                  access_token: accessToken,
                },
              }
            );
            const { email } = response.data;
            return email;
          } catch (error) {
            console.error(
              "Error retrieving user email:",
              error.response ? error.response.data : error.message
            );
            throw error;
          }
        };

        getUserEmail(accessToken)
          .then(async (email) => {
            const userEmail = email;
            const token= await authService.loginOrSignUp(userEmail)
            res.json({  "message": "Copy and paste the token in swagger for the authorization" , token});
            
          })
          .catch((err) => console.error("Failed to retrieve user email:", err));
      }
    }
  );
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
