require("dotenv").config();
const variables = require("./variables/index");
const koa = require("koa");
const { koaBody } = require("koa-body");
// const router = require("./routes");
const publicRouter = require("./routes/public");
const privateRouter = require("./routes/private");
const { logger, log } = require("./helper/logger");
const { attachDbConnectionWithCtx } = require("./helper/config");
const AuthMiddleware = require("./middleware/AuthMiddleware");

const app = new koa();

app.use(koaBody());
app.use(log);
app.use(attachDbConnectionWithCtx);
app.use(publicRouter.routes());
app.use(AuthMiddleware.verifyToken);
app.use(privateRouter.routes());

app.on("error", (err, ctx) => {
  logger.error({ err }, "Error occurred");
});
app.listen(variables.appPort, () => {
  logger.info(`Service is running on ${variables.appPort}`);
});

exports.models = app;
