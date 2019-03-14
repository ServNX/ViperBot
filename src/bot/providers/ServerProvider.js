const Server = require('../classes/Server');

module.exports = (container) => {
  container.service('Server', c => new Server(c.Database));
};
