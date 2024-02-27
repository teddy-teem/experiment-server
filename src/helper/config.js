const { getDbConnection } = require("../helper/dbConnector");
const { log } = require("./logger");

exports.attachDbConnectionWithCtx = async (ctx, next) => {
  ctx.dbConnection = await getDbConnection({
    database: "experimental",
  });
  await next();
};
