const Router = require('@koa/router');

const router = new Router({ prefix: '/contacts' });

router.get('/', async (ctx, next) => {
  ctx.body = 'Contacts main route'
})

module.exports = router;
