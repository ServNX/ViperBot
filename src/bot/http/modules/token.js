const axios = require('axios');
const config = require('../../config');

async function getToken (code, creds) {
  const url = `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${config.D_REDIRECT_URI}`;

  const headers = {
    Authorization: `Basic ${creds}`,
  };

  return await axios.post(url, {}, {headers})
    .then(response => {
      return response.data.access_token;
    })
    .catch(err => {
      return {
        error: err,
      };
    });
}

module.exports = {
  getToken,
};
