require("dotenv").config();
const axios = require('axios');
const route = require('../middleware/facebook-auth');
const userController = require("../../database/controllers/user-controller.js");

const appId = process.env.FACEBOOK_APP_ID;
const appSecret = process.env.FACEBOOK_APP_SECRET;
const redirectURI = 'http://localhost:5000/facebook-oauth-callback';


const facebookLogin = (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head></head>
  <body>
    <a target="_blank" href="https://www.facebook.com/v6.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectURI}&scope=id,name,email">Facebook</a>
  </body>
  </html>
  `);
}

const facebookLoginCallback = async (req, res) => {
  const authCode = req.query.code;
  try {
    const accessToken = await route.getAccessToken({ authCode, appId, appSecret, redirectURI });
    console.log('Access token is', accessToken);

    const user = await route.fetchUser(accessToken);
    console.log(user)
    // const userExists = userController.getOneUser(user)
    
    // if (!userExists) {
    //   await userController.createUser(user);
    //   res.status(200).send({ msg: 'New user created' });
    // }

    res.send(JSON.stringify(user.data));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

const getFacebookUser = async (req, res) => {
  const token = req.query.accessToken;

  if (token !== accessToken) {
    res.send({ msg: `Invalid access token: ${token}` });
  }
}

module.exports = {
  facebookLogin,
  facebookLoginCallback,
  getFacebookUser
};