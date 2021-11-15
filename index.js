const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./routers/');
const passport = require('./core/auth');
const sequelize = require('./core/db');

const app = new Koa();

app.use(logger());
app.use(router());
app.use(passport.initialize());

app.listen(3000, async () => {
  await sequelize.sync({ force: false });
  console.log('Server running on https://localhost:3000')
});
