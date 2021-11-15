const Router = require('@koa/router');

const CommonController = require('../controllers/common');

const router = new Router();

router
  .get('/', CommonController.main);

module.exports = router;
