const axios = require('axios');

async function getCurrentUser (token) {
  const url = 'https://discordapp.com/api/users/@me';

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(url, {headers})
    .then(response => {
      return response.data;
    })
    .catch(err => err.response);
}

module.exports = {
  getCurrentUser,
};
