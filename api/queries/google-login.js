require("dotenv").config();
const route = require('../middleware/google-auth');
const userController = require("../../database/controllers/user-controller.js");

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

const googleLogin = (req, res) => {
  const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  const include_granted_scopes = true;
  const response_type = 'token';
  const redirect_uri = 'http://localhost:5000/google-oauth-callback';
  const state = 'state_parameter_passthrough_value';

  res.redirect(`https://accounts.google.com/o/oauth2/auth?scope=${scope}&include_granted_scopes=${include_granted_scopes}&response_type=${response_type}&state=${state}&redirect_uri=${redirect_uri}&client_id=${clientId}`)
}


const googleLoginCallback = async (req, res) => {
  console.log(req)
  // res.send({ msg: req })
  // const code = req.query.access_token;
  // const accessToken = await route.getAccessToken({ code, clientId, clientSecret });

  // if (!accessToken) {
  //   res.status(401).send({ msg: 'Unauthorized' });
  // };

  // const { data: user } = await route.fetchGithubUser(accessToken, req);
  // const userExists = await userController.getOneUser(user);

  // if (userExists) {
  //   res.status(401).send({ msg: 'User already exists' });
  // } else {
  //   const newUser = await userController.createUser(user);
  //   res.status(200).send({ user: newUser, msg: 'User successfully logged in' });
  // }
}

module.exports = {
  googleLogin,
  googleLoginCallback
};