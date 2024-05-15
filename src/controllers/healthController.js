const { successResponse } = require("../utils/responseHandler");

exports.health = (ctx) => {
  console.log(ctx.request.header);
  successResponse(ctx, { data: null, message: "I am healthy" });
};
