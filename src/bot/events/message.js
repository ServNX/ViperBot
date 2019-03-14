module.exports = (client, container, message) => {
  const commands = container.Commands;
  const server = container.Server;
  const stat = container.Stat;

  if (!message.channel.guild || message.author.bot) return;

  server.getPrefix(message.guild.id)
    .then(prefix => {
      const msgArr = message.content.split(' ');
      const cmd = msgArr[0];
      const args = msgArr.slice(1);

      if (message.content.startsWith(prefix)) {
        const commandFile = commands.get(cmd.slice(prefix.length));

        if (commandFile) {
          const perm = commandFile.help.permission;

          if (message.guild.ownerID === message.author.id || perm === 'everyone') {
            return commandFile.run(container, client, message, args);
          }
          server.getByGuildId(message.guild.id)
            .then(s => {
              const admin = message.member.roles.find(v => v.id === s.admin_role);
              const mod = message.member.roles.find(v => v.id === s.mod_role);

              const role = message.member.roles.find(v => v.id === s[`${perm}_role`]);

              let allowed = false;

              switch (perm) {
                case 'mod':
                  if (admin) allowed = true;
                  break;
                case 'support':
                  if (admin || mod) allowed = true;
                  break;
                default:
                  allowed = false;
              }

              if (!role && !allowed) {
                return message.channel.send(':x: You do not have permission to use this command')
                  .then(m => m.delete(10000));
              }

              return commandFile.run(container, client, message, args);
            })
            .catch(err => console.log(err));
        }
      } else {
        const guildId = message.guild.id;
        const userId = message.author.id;
        const username = message.author.username;

        stat.getByUserId(guildId, userId)
          .then(s => {
            if (!s) {
              return stat.create(guildId, userId, username)
                .catch(err => console.log(err));
            }

            const count = s.msg_count + 1;

            let level = s.level;
            let earnings = s.earnings;

            const curLevel = Math.floor(0.1 * Math.sqrt(count)) + 1;

            if (level < curLevel) {
              level += 1;

              const earned = level * 5;
              earnings += earned;

              message.reply(`You've leveled up to level **${curLevel}** and gained **${earned}** earnings! Ain't that dandy?`);
            }

            stat.updateStats(s.id, count, level, earnings)
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};
