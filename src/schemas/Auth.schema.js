const { DataTypes } = require("sequelize");
exports.AuthSchema = {
  email: {
    primaryKey: true,
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },
  authId: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false,
  },
};
