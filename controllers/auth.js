require('dotenv').config();

const bcrypt = require('bcrypt');
const crypto = require("crypto");

const passport = require('../core/auth');

const { models: { User, UserProfile }, Op } = require('../core/db');

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

  forgot: async (ctx, next) => {
    const { email, phone } = ctx.request.body;

    if (!email && !phone) {
      ctx.status = 400;
      ctx.body = { message: 'Username or phone required.' };
      return;
    }

    const user = await User.findOne({ where: { [Op.or]: [ !!email ? { email } : null, !!phone ? { phone } : null ] } });

    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found.' };
      return;
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpire = Date.now() + 3600000;

    const result = await User.update({ reset: resetToken, resetExpire: resetTokenExpire }, { where: { id: user.id } });

    if (!result[0]) {
      ctx.status = 400;
      ctx.body = { message: 'Cant create reset token.' };
      return;
    }

    const host = process.env.NODE_ENV.trim() === "production" ? process.env.PROD_HOST : process.env.DEV_HOST;

    ctx.body = { link: `${host}/auth/reset-password/${resetToken}/` };
  },

  checkReset: async (ctx, next) => {
    const { token } = ctx.params;

    const user = await getUserByResetToken(token);

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: 'Password reset token is invalid or has expired.' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Password reset token is valid.' };
  },

  setPassword: async (ctx, next) => {
    const { token } = ctx.params;
    const { password } = ctx.request.body;

    const user = await getUserByResetToken(token);

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: 'Password reset token is invalid or has expired.' };
      return;
    }

    const result = await User.update(
      { password: await bcrypt.hash(password, 10), reset: null, resetExpire: null },
      { where: { id: user.id } }
    );

    if (!result[0]) {
      ctx.status = 400;
      ctx.body = { message: 'Cannot change password.' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Password has been changed successfully.' };
  },

  // refresh: (ctx, next) => {
  //   ctx.body = 'Refresh token';
  // },

  health: (ctx, next) => {
    ctx.body = 'Token is valid';
  }
}

const getUserByResetToken = async token => {
  return await User.findOne({ where: { [Op.and]: [ { reset: token }, { resetExpire: { [Op.gt]: Date.now() } } ] } });
}
