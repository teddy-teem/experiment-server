const { getCampaignsById } = require("../models/Pages");

exports.getCampaignsById = async (ctx, id) => {
  try {
    const res = await getCampaignsById(ctx, id);
    return res;
  } catch (error) {
    throw error;
  }
};
