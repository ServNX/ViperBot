module.exports = async (client, container) => {
  const server = container.Server;
  const stat = container.Stat;
  const http = container.httpServer;

  console.log(`Logged in as ${client.user.tag}!`);

  await client.user.setActivity('v0.1.0-Alpha', {type: 'WATCHING'})
    .then(presence => {
      console.log(`${presence.game ? presence.game.name : 'none'}`);
    })
    .catch((err) => {
      console.error(err);
    });

  client.guilds.forEach(guild => {
    server.getByGuildId(guild.id)
      .then(s => {
        if (!s) {
          server.create(guild.id)
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  });

  // Start the earning interval
  client.setInterval(() => {
    client.guilds.forEach(guild => {
      guild.members.forEach(member => {
        if (member.user.bot) return;

        stat.getByUserId(guild.id, member.id)
          .then(s => {
            if (!s) {
              stat.create(guild.id, member.user.id, member.user.username)
                .catch(err => console.log(err));
            } else {
              stat.updateStats(s.id, s.msg_count, s.level, s.earnings + 1);
            }
          })
          .catch(err => console.log(err));
      });
    });
  }, 3600000 * 2); // every 2 hours

  // Start Http Server
  http.start();
};
