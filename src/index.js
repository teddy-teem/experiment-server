require("dotenv").config();
const variables = require("./variables/index");
const koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("koa-cors");

// const router = require("./routes");
const publicRouter = require("./routes/public");
const privateRouter = require("./routes/private");
const { logger, log } = require("./utils/logger");
const { attachDbConnectionWithCtx } = require("./utils/config");
const { failedResponse } = require("./utils/responseHandler");

const app = new koa();

app.use(koaBody());
app.use(cors());
app.use(log);
app.use(attachDbConnectionWithCtx);
app.use(publicRouter.routes());
app.use(privateRouter.routes());

app.on("error", (err, ctx) => {
  logger.error({ err }, "Error occurred");
  failedResponse(ctx, err);
});
app.listen(variables.appPort, () => {
  logger.info(`Service is running on ${variables.appPort}`);
});

exports.models = app;
