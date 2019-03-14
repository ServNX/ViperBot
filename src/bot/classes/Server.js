module.exports = class Server {
  constructor (Database) {
    this.db = Database.db;
  }

  all () {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM servers', (err, rows) => {
        if (err) return reject(err.sqlMessage);

        if (rows.length <= 0) return resolve(null);

        return resolve(rows);
      });
    });
  }

  create (guildId) {
    return new Promise((resolve, reject) => {
      this.db.query('INSERT INTO servers (guild_id) VALUES (?)', [guildId], (err, results) => {
        if (err) return reject(err.sqlMessage);

        return resolve(results);
      });
    });
  }

  update (guildId, field, value) {
    return new Promise((resolve, reject) => {
      this.db.query(`UPDATE servers SET ${field} = ? WHERE guild_id = ?`, [value, guildId], (err, results) => {
        if (err) return reject(err.sqlMessage);

        return resolve(results);
      });
    });
  }

  getLast () {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM servers ORDER BY id DESC LIMIT 1;', (err, rows) => {
        if (err) return reject(err.sqlMessage);

        if (rows.length <= 0) return resolve(null);

        return resolve(rows[0]);
      });
    });
  }

  getCreatedAtGroups () {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT DATE(created_at) as created_at, count(*) as count FROM servers GROUP BY DATE(created_at)', (err, rows) => {
        if (err) return reject(err.sqlMessage);

        if (rows.length <= 0) return resolve(null);

        return resolve(rows);
      });
    });
  }

  getByGuildId (guildId) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM servers WHERE guild_id = ? LIMIT 1', [guildId], (err, rows) => {
        if (err) return reject(err.sqlMessage);

        if (rows.length <= 0) return resolve(null);

        return resolve(rows[0]);
      });
    });
  }

  getPrefix (guildId) {
    return new Promise((resolve, reject) => {
      this.getByGuildId(guildId)
        .then(server => {
          return resolve(server.prefix);
        })
        .catch(err => reject(err));
    });
  }

  set (guildId, key, value) {
    return new Promise((resolve, reject) => {
      if (value.startsWith('<#')) {
        value = value.replace('<#', '')
          .replace('>', '')
          .trim();
      } else if (value.startsWith('<@&')) {
        value = value.replace('<@&', '')
          .replace('>', '')
          .trim();
      } else {
        value = value.replace('#', '')
          .trim();
      }

      let field = '';

      switch (key) {
        case 'chan.log':
          field = 'log_channel';
          break;
        case 'role.admin':
          field = 'admin_role';
          break;
        case 'role.mod':
          field = 'mod_role';
          break;
        case 'role.support':
          field = 'support_role';
          break;
        case 'prefix':
          field = 'prefix';
          break;
        default:
          return resolve(null);
      }

      this.update(guildId, field, value)
        .then(results => {
          return resolve({
            results,
            key,
            value,
          });
        })
        .catch(err => reject(err));
    });
  }
};
