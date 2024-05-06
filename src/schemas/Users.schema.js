const { DataTypes } = require("sequelize");
exports.UserSchema = {
  userId: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  authId: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    required: false,
    allowNull: false,
  },
  dob: {
    type: DataTypes.STRING,
    required: false,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    required: false,
    allowNull: false,
  },
};
