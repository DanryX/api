const { omit } = require('lodash');

const { models: { Role } } = require('../core/db');

module.exports = {
  main: ctx => {
    ctx.body = 'User main route';
  },

  me: ctx => {
    let { user } = ctx.state;

    user['permissions'] = user.Role.permissions;
    user['profile'] = omit(user.UserProfile, ['userId']);

    ctx.body = omit(user, ['password', 'Role', 'UserProfile']);
  },

  roles: async ctx => {
    const roles = await Role.findAll();
    ctx.body = roles;
  }
}
