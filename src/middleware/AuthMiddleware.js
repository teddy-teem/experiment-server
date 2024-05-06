const { failedResponse } = require("../helper/responseHandler");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../variables");

exports.verifyToken = async (ctx, next) => {
  try {
    let token = ctx.request.header.authorization;
    token = token.replace(/^Bearer\s+/, "");
    if (!token) {
      throw { status: 401, message: "token is required." };
    }
    const decoded = jwt.verify(token, secretKey);
    ctx.request.body.userId = decoded.userId;
    await next();
  } catch (error) {
    failedResponse(ctx, { status: 401, message: error.message });
  }
};
