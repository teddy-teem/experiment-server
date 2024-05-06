const { Sequelize, Op, Model, DataTypes } = require("sequelize");

exports.getTableList = async (ctx) => {
  try {
    const tables = await ctx.sequelize.getQueryInterface().showAllSchemas();
    return tables.map((table) => table["Tables_in_experimental"]);
  } catch (error) {
    throw error;
  }
};
