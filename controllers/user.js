const { omit } = require('lodash');

module.exports = {
  main: ctx => {
    ctx.body = 'User main route';
  },

  me: ctx => {
    let { user } = ctx.state;

    user['permissions'] =  user.Role.permissions;
    user['profile'] =  omit(user.UserProfile, ['userId']);

    ctx.body = omit(user, ['password', 'Role', 'UserProfile']);
  }
}
