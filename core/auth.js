const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pick } = require('lodash');

const { models: { User, Role, UserProfile } } = require('./db');

passport.use(new LocalStrategy({ session: false }, (username, password, done) => {
  User.findOne({ where: { username }})
    .then(user => {
      if (!user) return done(null, false, { message: 'User not found.' });
      if (!user.active) return done(null, false, { message: 'User inactive.' });

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (!result) return done(null, false, { message: 'Incorrect username or password.' });

        const tokens = {
          accessToken: jwt.sign({ id: user.id }, 'super_secret', { expiresIn: '1d' }),
          refreshToken: jwt.sign({ email: user.email }, 'super_secret', { expiresIn: '1d' })
        };

        return done(null, { ...pick(user, ['id', 'username']), ...tokens });
      });

    })
    .catch(err => done(err));
}));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'super_secret',
  ignoreExpiration: false
};

passport.use(new JwtStrategy(opts, (payload, done) => {
  User.findOne({ where: { id: payload.id }, include: [ { model: Role }, { model: UserProfile } ] })
    .then(user => done(null, !!user ? user.toJSON() : false))
    .catch(err => done(err));
}));

module.exports = passport;
