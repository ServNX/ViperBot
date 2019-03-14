const fs = require('fs');

const config = require('./config');
const container = require('./container/createContainer')();

const client = container.Client;
const commands = container.Commands;

// Events
fs.readdir('./events/', (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client, container));
  });
});

// Commands
fs.readdir('./commands/', (err, files) => {
  if (err) console.log(err);

  const jsfile = files.filter(f => f.split('.')
    .pop() === 'js');

  if (jsfile.length <= 0) {
    console.log('Commands not found!');
  }

  jsfile.forEach(file => {
    if (!file.startsWith('_')) {
      const props = require(`./commands/${file}`);
      commands.set(props.help.name, props);
    }
  });
});

client.login(config.BOT_TOKEN);
