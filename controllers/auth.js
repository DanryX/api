const bcrypt = require('bcrypt');

const passport = require('../core/auth');

const { models: { User } } = require('../core/db');

module.exports = {
  registration: async (ctx, next) => {
    const { username, email, password } = ctx.request.body;

    if (!username) ctx.throw(400, 'Username required.');
    if (!password) ctx.throw(400, 'Password required.');

    const existEmail = await User.findOne({ where: { email } });
    if (!!existEmail) ctx.throw(400, 'Email already exist.');

    const existUser = await User.findOne({ where: { username } });
    if (!!existUser) ctx.throw(400, 'Username already exist.');

    const userData = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      role: 'user',
      active: 1
    };

    await User.create(userData)
      .then(() => ctx.body = 'Account has been successfully registered.')
      .catch(err => ctx.throw(err));
  },

  login: (ctx, next) => {
    return passport.authenticate('local', (err, user, info) => {
      if (user === false) {
        ctx.status = 401;
        ctx.body = info;
      } else {
        ctx.body = user;
      }
    })(ctx, next);
  },

  // refresh: (ctx, next) => {
  //   ctx.body = 'Refresh token';
  // },

  health: (ctx, next) => {
    ctx.body = 'Token is valid';
  }
}
