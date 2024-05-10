const { addCTR } = require("../services/ctrService");
const { failedResponse, successResponse } = require("../utils/responseHandler");

exports.countCTR = async (ctx) => {
  try {
    const { pageId } = ctx.request.params;
    const params = ctx.request.query;
    const res = await addCTR(ctx, {
      componentId: params.contentId,
      pageId,
      component: params.contentData,
    });
    successResponse(ctx, res);
  } catch (error) {
    failedResponse(ctx, error);
  }
};
