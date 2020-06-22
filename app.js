const express = require('express');
const bodyParser = require("body-parser");
const route = require('./middleware/index');
require('dotenv').config();

const app = express();
const port = 5000;

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
let token = null;


app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res) => {
  res.status(200).send({ msg: "hello" });
});

app.get('/login/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`)
});

app.get('/oauth-callback', async (req, res) => {
  const code = req.query.code;
  const accessToken = await route.getAccessToken({ code, clientId, clientSecret });

  if (!accessToken) {
    res.status(401).send({ msg: 'Unauthorized' });
  };

  token = accessToken

  try {
    const { data: user } = await route.fetchGithubUser(accessToken);
    res.status(200).send({ ok: user });
  } catch (error) {
    res.status(500).send({ msg: error.message });
    console.log(error);
  }
});

app.listen(port);
console.log(`Listening on port: ${port}`);
