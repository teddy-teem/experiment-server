const { successResponse, failedResponse } = require("../utils/responseHandler");
const authService = require("../services/authService");
const userService = require("../services/userService");
const bcrypt = require("bcrypt");

exports.login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const authDetails = await authService.getAuthDetailsByEmail(ctx, email);
    const isPasswordMatched = await bcrypt.compare(
      password,
      authDetails.hashPassword
    );

    if (!isPasswordMatched) {
      throw { status: 404, message: "Passwords are not matched." };
    }

    const userDetails = await userService.getUserByEmail(ctx, email);
    const loginResponse = await authService.login(ctx, userDetails);

    return successResponse(ctx, { accessToken: loginResponse }, 200);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.register = async (ctx) => {
  const transaction = await ctx.sequelize.transaction();
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      dob,
      address,
    } = ctx.request.body;
    const authResponse = await authService.register(ctx, {
      email,
      password,
      confirmPassword,
    });
    const userResponse = await userService.createUser(ctx, {
      email,
      authId: authResponse.authId,
      firstName,
      lastName,
      dob,
      address,
    });
    await transaction.commit();
    successResponse(ctx, userResponse, 201);
  } catch (error) {
    if (transaction) {
      transaction.rollback();
    }
    failedResponse(ctx, error);
  }
};
