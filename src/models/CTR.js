const { Op } = require("sequelize");

exports.addCTR = async (ctx, data) => {
  try {
    const { CTR } = ctx.sequelize.models;
    const [[_updatedRow, numberOfUpdatedRow]] = await CTR.increment(
      "clickCounter",
      {
        by: 1,
        where: { componentId: data.componentId },
      }
    );
    let res;
    if (numberOfUpdatedRow === 0) {
      res = await CTR.create(data);
    }
    return res;
  } catch (error) {
    throw error;
  }
};

exports.getCTR = async (ctx, pageId) => {
  try {
    const { CTR } = ctx.sequelize.models;
    const res = await CTR.findAll({
      where: {
        pageId: {
          [Op.eq]: pageId,
        },
      },
    });
    return res.map((i) => ({
      pageId: i.pageId,
      elementId: i.componentId,
      clickCount: i.clickCounter,
    }));
  } catch (error) {
    throw error;
  }
};
