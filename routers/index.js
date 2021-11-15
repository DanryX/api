const fs = require('fs');
const combineRouters = require('koa-combine-routers');

const routers = [];

fs
  .readdirSync('./routers')
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach((file) => routers.push(require(`./${file}`)));

const router = combineRouters(...routers);

module.exports = router;
