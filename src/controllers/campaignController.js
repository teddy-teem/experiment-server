const { failedResponse, successResponse } = require("../utils/responseHandler");
const {
  generateDifferentPromotionPageByHTMLExample,
  generateDifferentPromotionPageByHTMLExampleV2,
} = require("../services/gptService");
const ctrService = require("../services/ctrService");
const HTML = require("html-parse-stringify");

const pageService = require("../services/pageService");

exports.createCampaign = async (ctx) => {
  try {
    const { htmlContent, userId } = ctx.request.body;
    console.log(JSON.stringify(HTML.parse(htmlContent)));

    const a = await generateDifferentPromotionPageByHTMLExample(
      ctx,
      htmlContent
    );
    successResponse(ctx, a);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.createCampaignV2 = async (ctx) => {
  try {
    const { htmlContent, userId } = ctx.request.body;
    const a = await generateDifferentPromotionPageByHTMLExampleV2(
      ctx,
      htmlContent
    );
    successResponse(ctx, a);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignPages = async (ctx) => {
  try {
    const { userId } = ctx.request.body;
    // const a = await generateMultipleContent(ctx, htmlContent);
    successResponse(ctx, []);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignPageById = async (ctx) => {
  try {
    const { pageId } = ctx.request.params;
    const res = await pageService.getPageById(ctx, pageId);
    successResponse(ctx, res);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignCTRById = async (ctx) => {
  try {
    const { pageId } = ctx.request.params;
    const res = await ctrService.getCTR(ctx, pageId);
    successResponse(ctx, res);
  } catch (error) {
    failedResponse(ctx, error);
  }
};
