const Discord = require('discord.js');

module.exports = {

  async run (container, client, message, args) {
    const stat = container.Stat;

    stat.getEarnings(message.guild.id, message.author.id)
      .then(earnings => {
        const embed = new Discord.RichEmbed()
          .setAuthor(':: Your Earnings ::', client.user.avatarURL)
          .setThumbnail(message.author.avatarURL)
          .setDescription(`:moneybag: **${earnings}**`)

          .addField('What are earnings ?', 'Earnings are like xp or "coins". They are ViperBot currency ...\n'
            + 'Some commands, games and features will require set amounts of your earnings to work. \n')

          .addField('How do I gain earnings?', 'While you are idle in this server you will gain earnings every \n'
            + '2 hours. You also gain earnings through leveling up by participating in conversations throughout the server!\n'
            + 'You will also be able to gain earnings by winning games or challenges!');

        message.channel.send(embed);
      })
      .catch(err => console.log(err));
  },

  info (container, client, message, args) {
    const embed = new Discord.RichEmbed()
      .setAuthor(':: What Are Earnings ::', client.user.avatarURL)

      .setDescription('Earnings are like xp or "coins". They are ViperBot currency ...\n'
        + 'Some commands, games and features will require set amounts of your earnings to work. \n')

      .addField('How do I gain earnings?', 'While you are idle in this server you will gain earnings every \n'
        + '2 hours. You also gain earnings through leveling up by participating in conversations throughout the server!\n'
        + 'You will also be able to gain earnings by winning games or challenges!');

    message.channel.send(embed);
  },

  help: {
    name: 'earnings',
    description: 'Shows your available earnings',
    permission: 'everyone',
  },

};
