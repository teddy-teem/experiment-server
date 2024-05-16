const { failedResponse, successResponse } = require("../utils/responseHandler");
const {
  generateDifferentPromotionPageByHTMLExample,
  generateDifferentPromotionPageByHTMLExampleV2,
} = require("../services/gptService");
const ctrService = require("../services/ctrService");
const HTML = require("html-parse-stringify");
const fs = require("fs").promises;
var url = require("url");

const pageService = require("../services/pageService");
const { getCampaignsById } = require("../services/campaignService");
const { addFileToGithub } = require("../services/octkitService");

exports.createCampaign = async (ctx) => {
  try {
    const { htmlContent, userId } = ctx.request.body;
    console.log(JSON.stringify(HTML.parse(htmlContent)));

    const a = await generateDifferentPromotionPageByHTMLExample(
      ctx,
      htmlContent
    );
    successResponse(ctx, {
      data: a,
      link: { user: "/user" },
      status: 201,
    });
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
    successResponse(ctx, { data: a, status: 201 });
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignPages = async (ctx) => {
  try {
    const { userId } = ctx.request.body;
    // const a = await generateMultipleContent(ctx, htmlContent);
    successResponse(ctx, { message: "will implement soon" });
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignsById = async (ctx) => {
  try {
    const { campaignId } = ctx.request.params;
    if (!campaignId) {
      throw { status: 400, message: "Camo" };
    }
    const res = await getCampaignsById(ctx, campaignId);
    successResponse(ctx, { message: "Campaign", data: res });
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignPageById = async (ctx) => {
  try {
    const { pageId } = ctx.request.params;
    const res = await pageService.getPageById(ctx, pageId);
    successResponse(ctx, { data: res });
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignCTRById = async (ctx) => {
  try {
    const { pageId } = ctx.request.params;
    const res = await ctrService.getCTR(ctx, pageId);
    successResponse(ctx, { data: res });
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.downloadCampaignScript = async (ctx) => {
  try {
    const jsFile = await fs.readFile(
      __dirname + "/../" + "assets/myJs.js",
      "utf-8"
    );
    // console.log("===========", jsFile);
    ctx.set("Content-Disposition", 'attachment; filename="yourfile.js"');
    ctx.type = "application/javascript";
    ctx.body = "hello world";
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.getCampaignScripts = async (ctx) => {
  try {
    const { campaignId } = ctx.request.params;
    const res = await addFileToGithub(campaignId);
    const addr = `https://cdn.jsdelivr.net/gh/teddy-teem/exp-cdn/${campaignId}.js`;
    successResponse(ctx, {
      data: {
        scripts: `<div id=${campaignId}></div> 
        <script src="${addr.replace(/\"/g, "")}"></script>`,
      },
    });
  } catch (error) {
    failedResponse(ctx, error);
  }
};
