const { Op } = require("sequelize");

exports.createPage = async (ctx, data) => {
  try {
    const { Pages } = ctx.sequelize.models;
    const page = await Pages.create(data);
    return { pageId: page.pageId };
  } catch (error) {
    throw error;
  }
};

exports.getPageById = async (ctx, id) => {
  try {
    const { Pages } = ctx.sequelize.models;
    const page = await Pages.findByPk(id);
    return { pageId: page.pageId, htmlContent: page.htmlContent };
  } catch (error) {
    throw error;
  }
};
exports.getCampaignsById = async (ctx, id) => {
  try {
    const { Pages } = ctx.sequelize.models;
    const res = await Pages.findAll({
      where: {
        campaignId: {
          [Op.eq]: id,
        },
      },
    });
    return res.map((i) => ({
      pageId: i.pageId,
      elementId: i.componentId,
      htmlContent: i.htmlContent,
    }));
  } catch (error) {
    throw error;
  }
};
