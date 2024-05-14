require("dotenv").config();
const variables = require("./variables/index");
const koa = require("koa");
const { koaBody } = require("koa-body");
const cors = require("koa-cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-koa");
const mount = require("koa-mount");
const convert = require("koa-convert");

// const router = require("./routes");
const publicRouter = require("./routes/public");
const privateRouter = require("./routes/private");
const { logger, log } = require("./utils/logger");
const { attachDbConnectionWithCtx } = require("./utils/config");
const { failedResponse } = require("./utils/responseHandler");

const app = new koa();
const swaggerOption = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Experiment",
      version: "1.0.0",
    },
  },
  apis: ["./routes/public.js"],
};
const swaggerSpec = swaggerJsDoc(swaggerOption);

app.use(swaggerUi.serve);
app.use(convert(mount("/docs", swaggerUi.setup(swaggerSpec))));
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
