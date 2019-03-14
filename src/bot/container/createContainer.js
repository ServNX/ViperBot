const Container = require('./Container');

module.exports = () => {
  const container = new Container();

  require('../providers/AppProvider')(container);
  require('../providers/ServerProvider')(container);
  require('../providers/StatProvider')(container);

  return container;
};
