const compose = require('koa-compose');

const passport = require('./auth');

const checkInactive = (ctx, next) => {
  const { user } = ctx.state;

  if (!user.active) ctx.throw(403, 'User inactive.');

  return next();
}

const checkPermissions = permissions => (ctx, next) => {
  if (!permissions || !permissions.length) return next();

  const { user } = ctx.state;
  const currentPermissions = user.Role.permissions.split('|');
  const isAccepted = permissions.some(el => currentPermissions.includes(el));

  if (!isAccepted) ctx.throw(403, 'No permission to access.');

  return next();
}

module.exports = permissions => compose([
  passport.authenticate('jwt', { session: false }),
  checkInactive,
  checkPermissions(permissions)
]);
