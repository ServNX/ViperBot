const Users = require('../modules/users');

module.exports = async (req, res, next) => {
  let token = req.query.token;

  if (req.method !== 'GET') token = req.body.token;

  if (!token) return res.status(400)
    .json({
      message: 'Parameter \'token\' is required',
    });

  const user = await Users.getCurrentUser(token);

  if (user.status === 401) {
    return res.status(401)
      .json(user.statusText);
  }

  next();
};
