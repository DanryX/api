const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./routers/');
const passport = require('./core/auth');
const sequelize = require('./core/db');

const isProduction = process.env.NODE_ENV === 'production';

const app = new Koa();

if (!isProduction) {
  app.use(logger());
}

app.use(router());
app.use(passport.initialize());

app.listen(process.env.PORT, async () => {
  if (!isProduction) await sequelize.sync({ force: false });
  console.log(`Server running on https://localhost:${process.env.PORT}`)
});
