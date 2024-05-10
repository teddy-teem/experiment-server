const CTRModel = require("../models/CTR");

exports.addCTR = async (ctx, data) => {
  try {
    console.log(data);
    const res = await CTRModel.addCTR(ctx, data);
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getCTR = async (ctx, pageId) => {
  try {
    const res = await CTRModel.getCTR(ctx, pageId);
    console.log("=====Res", res);
    return res;
  } catch (error) {
    throw error;
  }
};
