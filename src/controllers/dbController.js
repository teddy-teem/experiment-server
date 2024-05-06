const {
  successResponse,
  failedResponse,
} = require("../helper/responseHandler");
const { getTableList } = require("../models/DBDetails");

exports.getTableList = async (ctx) => {
  try {
    const tableList = await getTableList(ctx);
    successResponse(ctx, tableList);
  } catch (error) {
    failedResponse(error);
  }
};
