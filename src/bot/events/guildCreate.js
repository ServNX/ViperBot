module.exports = async (client, container, guild) => {
  const server = container.Server;

  server.getByGuildId(guild.id)
    .then(s => {
      if (!s) {
        server.create(guild.id)
          .then(results => results)
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};
