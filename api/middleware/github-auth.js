const axios = require('axios');

const getAccessToken = async ({ code, clientId, clientSecret }) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    code: code
  };
  const opts = {
    headers: {
      accept: 'application/json'
    }
  };

  const response = await axios.post('https://github.com/login/oauth/access_token', body, opts);
  const accessToken = response.data['access_token'];

  return accessToken;
}

const fetchGithubUser = async (token) => {
  const user = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + token,
    },
  })

  return user;
}

module.exports = { getAccessToken, fetchGithubUser };