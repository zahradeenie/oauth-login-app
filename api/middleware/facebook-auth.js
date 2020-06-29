const axios = require('axios');

const getAccessToken = async ({ authCode, appId, appSecret, redirectURI }) => {
  const accessTokenUrl = `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&redirect_uri=${redirectURI}&code=${authCode}`;

  return await axios.get(accessTokenUrl).then(res => res.data['access_token']);
}

const fetchUser = async (token) => {
  const user = await axios.get(`https://graph.facebook.com/v6.0/me?access_token=${token}`);

  if (!user) {
    return 'No user'
  }

  return user;
}

module.exports = { getAccessToken, fetchUser };