const express = require('express');
const bodyParser = require("body-parser");
const githubRoute = require('./api/queries/github-login');
const googleRoute = require('./api/queries/google-login');

const app = express();
const port = 5000;

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

// Github
app.get('/login/github', githubRoute.githubLogin);
app.get('/github-oauth-callback', githubRoute.githubLoginCallback);

// Google
app.get('/login/google', googleRoute.googleLogin);
app.get('/oauth2callback', googleRoute.googleLoginCallback);


app.listen(port);
console.log(`Listening on port: ${port}`);
