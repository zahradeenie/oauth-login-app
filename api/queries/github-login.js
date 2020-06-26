require("dotenv").config();
const route = require('../middleware/github-auth');
const userController = require("../../database/controllers/user-controller.js");

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

const githubLogin = (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`)
}

const githubLoginCallback = async (req, res) => {
  const code = req.query.code;
  const accessToken = await route.getAccessToken({ code, clientId, clientSecret });

  if (!accessToken) {
    res.status(401).send({ msg: 'Unauthorized' });
  };

  const { data: user } = await route.fetchGithubUser(accessToken, req);
  const userExists = await userController.getOneUser(user);

  if (userExists) {
    res.status(401).send({ msg: 'User already exists' });
  } else {
    const newUser = await userController.createUser(user);
    res.status(200).send({ user: newUser, msg: 'User successfully logged in' });
  }
}

module.exports = {
  githubLogin,
  githubLoginCallback
};