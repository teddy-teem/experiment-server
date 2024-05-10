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
