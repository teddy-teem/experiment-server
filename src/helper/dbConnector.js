const mysql = require("mysql2/promise");
const variables = require("../variables/index");

exports.getDbConnection = async (config) => {
  try {
    return await mysql
      .createConnection({
        host: "localhost",
        user: "root",
        password: variables.mysqlPassword,
        database: config?.database || "experimental",
      })
      .catch((e) => {
        throw e;
      });
  } catch (error) {
    throw error;
  }
};
