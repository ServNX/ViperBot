const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

module.exports = (container, io) => {
  router.get('/', (req, res) => {
    res.status(200)
      .json({});
  });

  return router;
};
