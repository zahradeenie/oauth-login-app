const express = require('express');
const bodyParser = require("body-parser");
const route = require('./api/queries/github-login');

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
app.get('/login/github', route.githubLogin);
app.get('/oauth-callback', route.githubLoginCallback);

app.listen(port);
console.log(`Listening on port: ${port}`);
