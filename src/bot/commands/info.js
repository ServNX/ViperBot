const Discord = require('discord.js');

const InfoCommand = {

  async run (container, client, message, args) {
    if (args.length <= 0) {
      InfoCommand.info(container, client, message, args);
    } else {
      const commandFile = client.commands.get(args[0]);

      if (commandFile) {
        commandFile.info(container, client, message, args);
      } else {
        message.channel.send(':grey_exclamation: Not a valid command')
          .then(m => m.delete(10000));
      }
    }
  },

  info (container, client, message, args) {
    const server = container.Server;

    server.getByGuildId(message.guild.id)
      .then(s => {
        const logchan = message.guild.channels.find(val => val.id === s.log_channel) || {name: 'Not Set'};
        const aRole = message.guild.roles.find(val => val.id === s.admin_role) || {name: 'Not Set'};
        const mRole = message.guild.roles.find(val => val.id === s.mod_role) || {name: 'Not Set'};
        const sRole = message.guild.roles.find(val => val.id === s.support_role) || {name: 'Not Set'};

        const embed = new Discord.RichEmbed()
          .setAuthor(':: Information ::', client.user.avatarURL)

          .addField('Prefix', `\`${s.prefix}\``, true)
          .addField('Version', 'v0.1.0-Alpha', true)
          .addField('Servers', `${client.guilds.size}`, true)
          .addField('Users', `${client.users.size}`, true)
          .addField('Developer', 'xI Poppabear Ix#8590', true)
          .addField('Log Channel', `${logchan.name}`, true)
          .addField('Admin Role', `${aRole.name}`, true)
          .addField('Moderator Role', `${mRole.name}`, true)
          .addField('Support Role', `${sRole.name}`, true)

          .setFooter('This bot is still under construction')
          .setTimestamp()
          .setColor(0xFF0092);

        message.channel.send(embed);
      })
      .catch(err => console.log(err));
  },

  help: {
    name: 'info',
    description: 'Shows information about the bot or command',
    permission: 'everyone',
  },
};

module.exports = InfoCommand;
