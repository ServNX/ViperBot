const express = require('express');
const btoa = require('btoa');

const config = require('../../config');
const Token = require('../modules/token');

const router = express.Router();

module.exports = (container, io) => {
  router.get('/', (req, res) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.D_CLIENT_ID}&redirect_uri=${config.D_REDIRECT_URI}&response_type=code&scope=${config.D_SCOPE}`);
  });

  router.get('/callback', async (req, res) => {
    if (!req.query.code) return res.redirect(config.D_REDIRECT_AFTER_LOGIN);

    const code = req.query.code;
    const creds = btoa(`${config.D_CLIENT_ID}:${config.D_CLIENT_SECRET}`);

    const token = await Token.getToken(code, creds);
    res.redirect(`${config.D_REDIRECT_AFTER_LOGIN}?token=${token}`);
  });

  return router;
};
