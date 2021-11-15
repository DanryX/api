const Router = require('@koa/router');
const koaBody = require('koa-body');

const authJwt = require('../core/jwt');
const AuthController = require('../controllers/auth');

const router = new Router({ prefix: '/auth' });

router
  .post('/registration', koaBody({ multipart: true }), AuthController.registration)
  .post('/login', AuthController.login)
  // .get('/refresh', AuthController.refresh)
  .get('/health', authJwt(), AuthController.health);

module.exports = router;
