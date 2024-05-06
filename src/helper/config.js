const { getDbConnection } = require("../helper/dbConnector");
const { log, logger } = require("./logger");

exports.attachDbConnectionWithCtx = async (ctx, next) => {
  ctx.sequelize = await getDbConnection({
    database: "experimental",
  });
  await next();
};
