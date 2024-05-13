const { failedResponse } = require("../utils/responseHandler");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../variables");
const { getUser } = require("../services/userService");
const { validateJWT } = require("../utils/validator");

exports.verifyToken = async (ctx, next) => {
  try {
    let token = ctx.request.header.authorization;
    // validateJWT(token);
    token = token.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, secretKey);
    const userDetails = await getUser(ctx, decoded.userId);
    if (!userDetails.userId) {
      throw {
        code: 404,
        message: "User not found",
      };
    }
    ctx.request.body.userId = decoded.userId;
    await next();
  } catch (error) {
    failedResponse(ctx, error);
  }
};
