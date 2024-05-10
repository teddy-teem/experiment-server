const { DataTypes } = require("sequelize");
exports.PageSchema = {
  pageId: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.STRING,
  },
  htmlContent: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },
  campaignId: {
    type: DataTypes.STRING,
    required: false,
  },
};
