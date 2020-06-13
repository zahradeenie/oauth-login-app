const Koa = require('koa');
const koaRouter = require('koa-router');
const logger = require('koa-logger');

const app = new Koa();
const port = 5000;

// logs events to terminal
app.use(logger());

// error handling
app.use(async (ctx, next) => {
  try {
   await next(); 
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

// new instance of router and routes
const router = new koaRouter();

router.get('/', (ctx, next) => {
  console.log(ctx);
  ctx.body = ctx
});

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(port);

console.log(`Listening on port: ${port}`);

module.exports = server;

