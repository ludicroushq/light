const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    hello: 'world',
  };
  next();
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
