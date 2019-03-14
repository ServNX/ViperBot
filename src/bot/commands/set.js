const Discord = require('discord.js');

const SetCommand = {

  keys: [
    'chan.log',
    'role.admin',
    'role.mod',
    'role.support',
    'prefix',
  ],

  async run (container, client, message, args) {
    await message.delete();

    if (args.length <= 1) {
      return message.channel.send(':x: You must provide a key and value!')
        .then(m => m.delete(10000));
    }

    const server = container.Server;

    const key = args[0];
    const value = args[1];

    server.set(message.guild.id, key, value)
      .then(r => {
        message.channel.send(`:white_check_mark: Set \`${r.key}\` to \`${r.value}\``)
          .then(m => m.delete(5000));
      })
      .catch(err => {
        return message.channel.send(`:x: Invalid Property!\n\nAvailable Properties:\n\`${SetCommand.keys.join('\n')
          .trim()}\``)
          .then(m => m.delete(15000));
      });
  },

  info (container, client, message, args) {
    const server = container.Server;

    server.getPrefix(message.guild.id)
      .then(prefix => {
        const embed = new Discord.RichEmbed()
          .setAuthor(':: Set Command Info ::', client.user.avatarURL)
          .addField('Usage: ', `\`${prefix}set <key> <value>\``)
          .addField('Available Properties: ', `\`${SetCommand.keys.join('\n')
            .trim()}\``, true);

        message.channel.send(embed);
      })
      .catch(err => console.log(err));
  },

  help: {
    name: 'set',
    description: 'Sets server properties',
    permission: 'owner',
  },

};

module.exports = SetCommand;
