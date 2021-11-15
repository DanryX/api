const Router = require('@koa/router');

const authJwt = require('../core/jwt');
const UserController = require('../controllers/user');

const router = new Router({ prefix: '/user' });

router
  .get('/', UserController.main)
  .get('/me', authJwt(['base:view', 'all:view']), UserController.me);

module.exports = router;
