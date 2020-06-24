require("dotenv").config();
const route = require('../middleware/github-auth');

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
    const { data: user } = await route.fetchGithubUser(accessToken);
    res.status(200).send({ ok: user });
  } catch (error) {
    res.status(500).send({ msg: error.message });
    console.log(error);
  }
}

module.exports = {
  githubLogin,
  githubLoginCallback
};