require("dotenv").config();
const variables = require("./variables/index");
const koa = require("koa");
const { koaBody } = require("koa-body");
const router = require("./routes");
const { logger, log } = require("./helper/logger");
const { attachDbConnectionWithCtx } = require("./helper/config");

const app = new koa();

app.use(koaBody());
app.use(log);
// app.use(attachDbConnectionWithCtx);
app.use(router.routes());

app.on("error", (err, ctx) => {
  logger.error({ err }, "Error occurred");
});
app.listen(variables.appPort, () => {
  logger.info(`Service is running on ${variables.appPort}`);
});

exports.models = app;
