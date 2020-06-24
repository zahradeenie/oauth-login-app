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

  try {
    const { data: user } = await route.fetchGithubUser(accessToken, req);
    if (user) {

      await userController.createUser(user)
    }

    res.status(200).send({ msg: 'User successfully logged in' });
  } catch (error) {
    res.status(500).send({ msg: error.message });
    console.log(error);
  }
}

module.exports = {
  githubLogin,
  githubLoginCallback
};