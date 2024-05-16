const { addFileToRepo } = require("../adapters/octkitAdapter");

exports.addFileToGithub = async (campaignId) => {
  try {
    console.log("===============", campaignId);
    const res = await addFileToRepo(campaignId);
    return res;
  } catch (error) {
    throw error;
  }
};
