const Router = require('@koa/router');

const authJwt = require('../core/jwt');
const UserController = require('../controllers/user');

const router = new Router({ prefix: '/user' });

router
  .get('/', UserController.main)
  .get('/me', authJwt(['all:view', 'base:view']), UserController.me)
  .get('/roles', authJwt(['all:view', 'roles:view']), UserController.roles);

module.exports = router;
