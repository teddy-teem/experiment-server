const bcrypt = require("bcrypt");

const { successResponse, failedResponse } = require("../utils/responseHandler");
const authService = require("../services/authService");
const userService = require("../services/userService");
const {
  validateRegisterRequestBody,
  validateLoginRequestBody,
} = require("../utils/validator");

exports.login = async (ctx) => {
  try {
    if (!ctx.request.body?.email || !ctx.request.body?.password) {
      throw { status: 400, message: "Email/Password  is not valid." };
    }
    const { email, password } = ctx.request.body;
    validateLoginRequestBody({ email, password });
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

    return successResponse(ctx, {
      data: { accessToken: loginResponse },
      link: { user: "/user" },
      status: 200,
    });
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

    validateRegisterRequestBody({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      dob,
      address,
    });

    const user = await authService.getAuthDetailsByEmail(ctx, email);
    if (user.email) {
      throw { status: 400, message: "User is already exists with this email." };
    }

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
    successResponse(ctx, {
      data: userResponse,
      message: "Registration successful",
      link: { login: "/login" },
    });
  } catch (error) {
    if (transaction) {
      transaction.rollback();
    }
    failedResponse(ctx, error);
  }
};
