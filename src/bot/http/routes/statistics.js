const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');

module.exports = (container, io) => {
  const client = container.Client;
  const server = container.Server;

  router.get('/', checkAuth, (req, res) => {
    server.getCreatedAtGroups()
      .then(groups => {
        server.getLast()
          .then(last => {
            res.status(200)
              .json({
                server_count: client.guilds.size,
                user_count: client.users.size,
                channel_count: client.channels.size,
                created_at_groups: {
                  groups,
                  last: last.created_at,
                },
              });
          })
          .catch(err => res.status(400)
            .json(err));
      })
      .catch(err => res.status(400)
        .json(err));
  });

  return router;
};
