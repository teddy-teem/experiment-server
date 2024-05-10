const { v4: uuidv4, v4 } = require("uuid");
const { askGPT } = require("../adapters/gptAdapter");
const {
  attachCTRMethod,
  extractTextContent,
  replaceTextAndGenerateHTML,
} = require("./htmlService");
const { createPage } = require("../services/pageService");
const {
  getQuestionsToGenerateMultiplePromotionPage,
} = require("../variables/jsScripts");

exports.generateDifferentPromotionPageByHTMLExample = async (ctx, html) => {
  try {
    const res = await askGPT(
      getQuestionsToGenerateMultiplePromotionPage(html, 2)
    );
    const result = [];
    JSON.parse(res).map(async (item) => {
      const id = uuidv4();
      const updatedPage = await attachCTRMethod(item, id);
      result.push({ htmlContent: updatedPage, pageId: id });
      createPage(ctx, {
        htmlContent: updatedPage,
        pageId: id,
        userId: ctx.request.body.userId,
      });
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.generateDifferentPromotionPageByHTMLExampleV2 = async (ctx, html) => {
  try {
    const result = await extractTextContent(
      html.replace(/\\n/g, "").replace(/\\t/g, "")
    );
    // console.log("=====RES", result);
    const res = await askGPT(
      `Generate 4 alternative for each of these ${result} text but do not change brand name, or any numeric value, if there is no alternative of that text then keep that text's copy on response & response me like [{"${result[0]}": ["alternative1", "alternative2", "alternative3", "alternative4"]}, {"${result[1]}": ["alternative1", "alternative2", "alternative3", "alternative4"]}, {"${result[2]}": ["alternative1", "alternative2", "alternative3", "alternative4"]}, ........]`
    );

    console.log("========", res);

    const out = replaceTextAndGenerateHTML(
      ctx,
      html.replace(/\\n/g, "").replace(/\\t/g, "").replace(/\\/g, ""),
      { numberOfPage: 4, replacements: JSON.parse(res) }
    );

    return out;
    // return result;
  } catch (error) {
    throw error;
  }
};
