const Router = require('@koa/router');

const authJwt = require('../core/jwt');
const AuthController = require('../controllers/auth');

const router = new Router({ prefix: '/auth' });

router
  .post('/registration', AuthController.registration)
  .post('/via-username', AuthController.viaUsername)
  .post('/via-phone', AuthController.viaPhone)
  .post('/forgot', AuthController.forgot)
  .get('/reset-password/:token', AuthController.checkReset)
  .post('/reset-password/:token', AuthController.setPassword)
  // .get('/refresh', AuthController.refresh)
  .get('/health', authJwt(), AuthController.health);

module.exports = router;
