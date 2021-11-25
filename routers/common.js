const Router = require('@koa/router');

const CommonController = require('../controllers/common');
const { openapi } = require('../core/swagger');

const router = new Router();

router
  .get('/', CommonController.main)
  .get('/docs/openapi.json', openapi);

module.exports = router;
