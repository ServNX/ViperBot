const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

module.exports = (container, io) => {
  const server = container.Server;

  router.get('/', checkAuth, (req, res) => {
    server.all()
      .then(rows => {
        res.status(200)
          .json(rows);
      })
      .catch(err => res.status(400)
        .json(err));
  });

  return router;
};
