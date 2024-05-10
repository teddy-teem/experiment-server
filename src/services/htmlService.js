const HTML = require("html-parse-stringify");
const cheerio = require("cheerio");
const { getCTRFunction } = require("../variables/jsScripts");
const { v4: uuidv4, v4 } = require("uuid");
const { createPage } = require("../services/pageService");

exports.attachCTRMethod = async (obj, uuid) => {
  const $ = cheerio.load(obj);
  // Append the new script element
  $("body").append(`<script>${getCTRFunction(uuid)}</script>`);
  // Update onclick attributes of button and anchor elements
  // Remove inline CSS
  // $("[style]").removeAttr("style");

  // // Remove CSS within style tags
  // $("style").remove();

  // Extract text content
  const textContent = [];

  $("body *").each((index, element) => {
    const text = $(element).text().trim();
    if (text.length > 0) {
      textContent.push(text);
    }
  });

  $("button").each(function () {
    const existingOnClick = $(this).attr("onclick");
    const existingId = $(this).attr("id") || uuidv4();
    $(this).attr(
      "onclick",
      existingOnClick
        ? `${existingOnClick}; makeCTR("${existingId}", ${JSON.stringify(
            $.html(this)
          )});`
        : `makeCTR("${existingId}", ${JSON.stringify($.html(this))});`
    );
    $(this).attr("id", existingId);
  });

  $("a").each(function () {
    const existingOnClick = $(this).attr("onclick");
    const existingId = $(this).attr("id") || uuidv4();
    $(this).attr(
      "onclick",
      existingOnClick
        ? `${existingOnClick}; makeCTR("${existingId}", ${JSON.stringify(
            $.html(this)
          )});`
        : `makeCTR("${existingId}", ${JSON.stringify($.html(this))})`
    );
    $(this).attr("id", existingId);
  });
  const updatedHtmlString = $.html();
  return updatedHtmlString;
};

exports.extractTextContent = async (obj) => {
  try {
    const $ = cheerio.load(obj.replace(/\n/g, "").replace(/ {2,}/g, " "));

    // Tags to include
    const tagsToInclude = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6", // Headings
      "p", // Paragraphs
      "span", // Inline elements
      "div", // Division or container elements
      "a", // Anchor links
      "button", // Buttons
      "strong", // Strong emphasis
      "em", // Emphasis
      "b", // Bold text
      "i", // Italic text
      "u", // Underlined text
      "blockquote", // Block quotations
      "label", // Labels for form elements
      "title", // Document title
      "figcaption", // Figure captions
    ];

    // Extract text content
    const textContent = [];

    tagsToInclude.forEach((tag) => {
      $(tag).each((index, element) => {
        const text = $(element).text().trim();
        if (text.length > 0) {
          textContent.push(text);
        }
      });
    });
    return textContent;
  } catch (error) {
    throw error;
  }
};

exports.replaceTextAndGenerateHTML = async (
  ctx,
  html,
  { numberOfPage, replacements }
) => {
  const modifiedHTMLs = [];
  console.log(replacements.length);
  for (let i = 0; i < numberOfPage; i++) {
    let newHtml = html;
    for (let j = 0; j < replacements.length; j++) {
      const key = Object.keys(replacements[j]);
      newHtml = newHtml.replace(key, replacements[j][key][i]);
    }
    const cleanedNewHtml = newHtml
      .replace(newHtml[0], "")
      .replace(newHtml[newHtml.length - 1], "");
    const id = uuidv4();
    const attachedFun = await this.attachCTRMethod(cleanedNewHtml, id);
    createPage(ctx, {
      htmlContent: attachedFun,
      pageId: id,
      userId: ctx.request.userId,
    });
    modifiedHTMLs.push({
      pageId: id,
      htmlContent: attachedFun,
    });
  }

  return modifiedHTMLs;
};
