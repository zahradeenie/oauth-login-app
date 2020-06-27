const axios = require('axios');

const getAccessToken = async ({ clientId, clientSecret }) => {
  const body = {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: 'localhost:5000',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    include_granted_scopes: 'true',
    state: 'pass-through value'
  };
  const opts = {
    headers: {
      accept: 'application/json'
    }
  };

  const response = await axios.post('https://accounts.google.com/o/oauth2/v2/auth', body, opts);
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