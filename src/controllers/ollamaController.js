const { failedResponse, successResponse } = require("../utils/responseHandler");
const ollamaService = require("../services/ollamaService");

exports.askOllama = async (ctx) => {
  try {
    const res = await ollamaService.askOllama(ctx, ctx.request.body?.prompt);
    successResponse(ctx, { data: res });
  } catch (error) {
    failedResponse(ctx, error);
  }
};
