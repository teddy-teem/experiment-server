const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

const variables = require("../variables/index");
const { UserSchema } = require("../schemas/Users.schema");
const { AuthSchema } = require("../schemas/Auth.schema");

exports.getDbConnection = async (config) => {
  try {
    const sequelize = new Sequelize({
      dialect: "mysql",
      host: "localhost",
      username: "root",
      password: variables.mysqlPassword,
      database: config?.database || "experimental",
      logging: false,
      define: {
        // Prevent Sequelize from pluralizing table names
        freezeTableName: true,
      },
      // sync: { alter: true }, // Set alter option to true to update schema instead of dropping tables
    });
    await sequelize.authenticate();
    sequelize.define("Users", UserSchema, {
      tableName: "Users",
    });
    sequelize.define("Auth", AuthSchema, {
      tableName: "Auth",
    });

    await sequelize.sync({ alter: true });
    return sequelize;
  } catch (error) {
    throw error;
  }
};
