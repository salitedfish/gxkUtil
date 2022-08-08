const Koa = require("koa");
const Router = require("koa-router");
const sendFile = require("koa-sendfile");
const staticServer = require("koa-static");
const bodyparser = require("koa-bodyparser");
const path = require("path");
const createRouter = require("./createRouter.js");

const server = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  await sendFile(ctx, path.join(__dirname, "index.html"));
});

router.post("/createRouter", async (ctx) => {
  createRouter(JSON.stringify(ctx.request.body));
  ctx.response.body = "成功";
});

server.use(staticServer(__dirname, "src"));
server.use(bodyparser());
server.use(router.routes()); //作用：启动路由
server.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑

server.listen(3001, () => {
  console.log("serve run on 3001");
});
