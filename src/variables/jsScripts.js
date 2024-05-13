exports.getCTRFunction = (uuid) =>
  `function makeCTR(contentId, contentData) {
    fetch(
      "http://192.168.11.68:8082/api/v1/ctr/${uuid}?contentId=" +
        contentId +
        "&contentData="+
        contentData
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }`;

exports.getQuestionsToGenerateMultiplePromotionPage = (
  html,
  numberOfPage = 4
) =>
  `generate ${numberOfPage} html code based on this html code ${html} by changing text content but keep the meaning same & do not change brand name. change h tags, p tags, title tags, button text etc , & make SEO Friendly. now response it exactly with format in json array like this ["<html>...</html>", "<html>...</html>", "<html>...</html>", "<html>...</html>"]`;
