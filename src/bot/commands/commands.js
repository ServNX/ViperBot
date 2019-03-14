const Discord = require('discord.js');

const CommandsCommand = {

  async run (container, client, message, args) {
    await message.delete();

    const embed = new Discord.RichEmbed()
      .setAuthor(':: Available Commands ::', client.user.avatarURL)
      .setColor('BLUE');

    client.commands.forEach((v, k) => {
      const desc = v.help.description;
      const perm = v.help.permission;

      embed.addField(`**${k}**`, `${desc}\n**Permission Level**: \`${perm}\``);
    });

    message.channel.send(embed);
  },

  info (container, client, message, args) {
    message.channel.send(':grey_exclamation: No information available')
      .then(m => m.delete(10000));
  },

  help: {
    name: 'commands',
    description: 'Shows all enabled commands',
    permission: 'everyone',
  },

};

module.exports = CommandsCommand;
