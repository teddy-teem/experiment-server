const { DataTypes } = require("sequelize");
exports.CTRSchema = {
  componentId: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    primaryKey: true,
  },
  pageId: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },
  component: {
    type: DataTypes.TEXT,
    require: true,
    allowNull: false,
  },
  clickCounter: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
};
