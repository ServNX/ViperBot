const Stat = require('../classes/Stat');

module.exports = (container) => {
  container.service('Stat', c => new Stat(c.Database));
};
