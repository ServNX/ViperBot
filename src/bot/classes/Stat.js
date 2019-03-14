module.exports = class Stat {
  constructor (Database) {
    this.db = Database.db;
  }

  all (guildId) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM stats WHERE guild_id = ?', [guildId], (err, rows) => {
        if (err) return reject(err.sqlMessage);

        if (rows.length <= 0) return resolve(null);

        return resolve(rows);
      });
    });
  }

  create (guildId, userId, username) {
    return new Promise((resolve, reject) => {
      this.db.query('INSERT INTO stats (guild_id, user_id, username) VALUES (?,?,?)', [
        guildId,
        userId,
        username,
      ], (err, results) => {
        if (err) return reject(err.sqlMessage);

        return resolve(results);
      });
    });
  }

  getByUserId (guildId, userId) {
    return new Promise((resolve, reject) => {
      this.db.query('SELECT * FROM stats WHERE guild_id = ? AND user_id = ?', [guildId, userId], (err, rows) => {
        if (err) return reject(err.sqlMessage);

        if (rows.length <= 0) return resolve(null);

        return resolve(rows[0]);
      });
    });
  }

  updateStats (statId, count, level, earnings) {
    return new Promise((resolve, reject) => {
      this.db.query('UPDATE stats SET msg_count = ?, level = ?, earnings = ? WHERE id = ?', [
        count,
        level,
        earnings,
        statId,
      ], (err, results) => {
        if (err) return reject(err.sqlMessage);

        return resolve(results);
      });
    });
  }

  getEarnings (guildId, userId) {
    return new Promise((resolve, reject) => {
      this.getByUserId(guildId, userId)
        .then(stats => {
          return resolve(stats.earnings);
        })
        .catch(err => reject(err));
    });
  }
};
