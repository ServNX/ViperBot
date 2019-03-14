const Discord = require('discord.js');
const Database = require('../classes/Database');
const HttpServer = require('../http/httpServer');

module.exports = (container) => {
  container.service('Client', () => new Discord.Client());
  container.service('Commands', () => new Discord.Collection());
  container.service('Database', () => new Database());
  container.service('httpServer', c => new HttpServer(c));
};
