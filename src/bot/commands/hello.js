const HelloCommand = {

  async run (container, client, message, args) {
    message.reply('Hello There!');
  },

  info (container, client, message, args) {
    message.channel.send(':grey_exclamation: No information available')
      .then(m => m.delete(10000));
  },

  help: {
    name: 'hello',
    description: 'Check if i\'m alive',
    permission: 'everyone',
  },

};

module.exports = HelloCommand;
