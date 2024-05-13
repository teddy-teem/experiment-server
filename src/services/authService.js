const AuthModel = require("../models/Auth");
const { v4: uuidv4, v4 } = require("uuid");
const bcrypt = require("bcrypt");
const { hashSalt, secretKey } = require("../variables");
const jwt = require("jsonwebtoken");

exports.register = async (ctx, user) => {
  try {
    if (user.password !== user.confirmPassword) {
      throw { message: "Passwords aren't matched.", status: 400 };
    }
    if (!user.email) {
      throw { message: "Email is required", status: 400 };
    }
    const hashPassword = await bcrypt.hash(user.password, hashSalt);

    const res = await AuthModel.register(ctx, {
      authId: uuidv4(),
      email: user.email,
      password: hashPassword,
    });
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getAuthDetailsByEmail = async (ctx, email) => {
  try {
    const auth = await AuthModel.getAuthDetailsByEmail(ctx, email);
    return auth;
  } catch (error) {
    throw error;
  }
};

exports.login = async (ctx, userDetails) => {
  try {
    const token = jwt.sign({ userId: userDetails.userId }, secretKey, {
      expiresIn: "10h",
    });
    console.log(token);
    return token;
  } catch (error) {
    throw error;
  }
};
