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
    const accessTokenUrl = `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&redirect_uri=${redirectURI}&code=${authCode}`;

    const accessToken = await axios.get(accessTokenUrl).then(res => res.data['access_token']);
    console.log('Access token is', accessToken);

    const user = await axios.get(`https://graph.facebook.com/v6.0/me?access_token=${accessToken}`);
    // const userExists = userController.getOneUser(user)
    console.log(user);

    // if (user) {
    //   await userController.createUser(user);
    // }

    res.send(JSON.stringify(user.data));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.response.data || err.message });
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