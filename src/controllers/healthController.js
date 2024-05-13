const { successResponse } = require("../utils/responseHandler");

exports.health = (ctx) => {
  successResponse(ctx, { data: null, message: "I am healthy" });
};
