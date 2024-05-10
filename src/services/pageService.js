const Pages = require("../models/Pages");

exports.createPage = async (ctx, data) => {
  try {
    const res = await Pages.createPage(ctx, data);
    return true;
  } catch (error) {
    throw error;
  }
};

exports.getPageById = async (ctx, id) => {
  try {
    const res = await Pages.getPageById(ctx, id);
    return res;
  } catch (error) {
    throw error;
  }
};
