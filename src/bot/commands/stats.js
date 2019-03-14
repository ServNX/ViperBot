const Discord = require('discord.js');

const StatsCommand = {

  async run (container, client, message, args) {
    const stat = container.Stat;

    stat.all(message.guild.id)
      .then(stats => {
        stats.sort((a, b) => {
          if (a.msg_count < b.msg_count) return 1;
          if (a.msg_count > b.msg_count) return -1;
          return 0;
        });

        const embed = new Discord.RichEmbed()
          .setTitle('**:: Leaderboards ::**')
          .setThumbnail(client.user.avatarURL)
          .setAuthor('ViperBot', client.user.avatarURL);

        if (!stats) {
          embed.setColor('RED');
          embed.addField('No Data Found!', 'Apparently no data has been collected. Chatting in channels'
            + 'will get this thing rolling and bot commands do not count as messages! **Please participate!**');
        } else {
          embed.setColor('BLURPLE');

          for (let i = 0; i < stats.length; i++) {
            embed.addField(
              `**#${i + 1}   ${stats[i].username}**`,
              `**Messages**: \`${stats[i].msg_count}\` **Level**: \`${stats[i].level}\` **Earnings**: \`${stats[i].earnings}\``,
            );

            if (i + 1 === 10) return message.channel.send(embed);
          }
        }
      })
      .catch(err => console.log(err));
  },

  info (container, client, message, args) {
    message.channel.send(':grey_exclamation: No information available')
      .then(m => m.delete(10000));
  },

  help: {
    name: 'stats',
    description: 'Shows stats for the top 10 members (AKA the Leaderboard)',
    permission: 'everyone',
  },

};

module.exports = StatsCommand;
