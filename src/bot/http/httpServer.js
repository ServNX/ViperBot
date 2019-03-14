const fs = require('fs');
const Express = require('express');

const app = Express();
const server = app.listen(3050, () => console.log('Http server listening on port 3050 ...'));
const io = require('socket.io')(server);

// Middlewares
// const socketIo = require('socket.io');
const cors = require('./middlewares/cors');

module.exports = class httpServer {
  constructor (container) {
    this.container = container;
  }

  start () {
    app.use(cors);
    io.origins('localhost:8080 127.0.0.1:8080');

    app.use(Express.json());
    app.use(Express.urlencoded({extended: true}));

    fs.readdir('./http/routes/', (err, files) => {
      if (err) console.error(err);

      if (files.length <= 0) {
        console.log('Routes not found!');
      }

      files.forEach((file) => {
        if (!file.startsWith('_')) {
          const prefix = file.replace('.js', '')
            .trim();
          const router = require(`./routes/${file}`)(this.container, io);
          app.use(`/api/${prefix}`, router);
        }
      });
    });
  }
};
