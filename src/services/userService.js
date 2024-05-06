const UserModel = require("../models/Users");
const { v4: uuidv4, v4 } = require("uuid");

exports.createUser = async (ctx, user) => {
  try {
    const res = await UserModel.createUsers(ctx, { userId: uuidv4(), ...user });
    return res;
  } catch (error) {
    throw error;
  }
};
exports.getUser = async (ctx, userId) => {
  try {
    const res = await UserModel.getUser(ctx, userId);
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getUserByEmail = async (ctx, email) => {
  try {
    const res = await UserModel.getUserByEmail(ctx, email);
    console.log("=====", res);
    return res;
  } catch (error) {
    throw error;
  }
};
