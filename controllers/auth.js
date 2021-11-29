const bcrypt = require('bcrypt');

const passport = require('../core/auth');

const { models: { User, UserProfile } } = require('../core/db');

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

    try {
      const newUser = await User.create(userData);

      await UserProfile.create({ userId: newUser.id });

      ctx.body = { id: newUser.id };
    } catch(err) {
      ctx.throw(err);
    }
  },

  viaUsername: (ctx, next) => {
    return passport.authenticate('local', (err, user, info) => {
      if (!!err) ctx.throw(500, err);

      if (user === false) {
        ctx.status = 400;
        ctx.body = info;
      } else {
        ctx.body = user;
      }
    })(ctx, next);
  },

  viaPhone: (ctx, next) => {
    return passport.authenticate('phone', (err, user, info) => {
      if (!!err) ctx.throw(500, err);

      if (user === false) {
        ctx.status = 400;
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
