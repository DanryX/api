require('dotenv').config();

const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pick } = require('lodash');

const { models: { User, Role, UserProfile } } = require('./db');

passport.use('local', new LocalStrategy({ session: false }, (username, password, done) =>
  localAuth({ username }, password, done)
));

passport.use('phone', new LocalStrategy({ session: false, usernameField: 'phone' }, (phone, password, done) =>
  localAuth({ phone }, password, done)
));

const localAuth = (identifier, password, done) => {
  User.findOne({ where: { [Object.keys(identifier)[0]]: Object.values(identifier)[0] }})
    .then(user => {
      if (!user) return done(null, false, { message: 'User not found.' });
      if (!user.active) return done(null, false, { message: 'User inactive.' });

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (!result) return done(null, false, { message: 'Incorrect identifier or password.' });

        const tokens = {
          accessToken: jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1d' }),
          refreshToken: jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: '1m' })
        };

        return done(null, { ...pick(user, ['id', Object.keys(identifier)[0]]), ...tokens });
      });

    })
    .catch(err => done(err));
}

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
  ignoreExpiration: false
};

passport.use(new JwtStrategy(opts, (payload, done) => {
  User.findOne({ where: { id: payload.id }, include: [ { model: Role }, { model: UserProfile } ] })
    .then(user => done(null, !!user ? user.toJSON() : false))
    .catch(err => done(err));
}));

module.exports = passport;
