const { failedResponse, successResponse } = require("../utils/responseHandler");
const UserService = require("../services/userService");

exports.createUser = async (ctx) => {
  try {
    const response = await UserService.createUser(ctx, ctx.request.body);
    successResponse(ctx, { data: response });
  } catch (error) {
    failedResponse(error);
  }
};

exports.getUser = async (ctx) => {
  try {
    const { userId } = ctx.request.body;
    const response = await UserService.getUser(ctx, userId);
    successResponse(ctx, {
      data: response,
      message: "User details fetched successfully",
    });
  } catch (error) {
    failedResponse(error);
  }
};
