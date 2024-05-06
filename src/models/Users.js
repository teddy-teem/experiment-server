exports.getUser = async (ctx, userId) => {
  try {
    const { Users } = ctx.sequelize.models;
    const res = await Users.findByPk(userId);
    return res;
  } catch (error) {
    throw error;
  }
};
exports.getUserByEmail = async (ctx, email) => {
  try {
    const { Users } = ctx.sequelize.models;
    const res = await Users.findAll({ where: { email: email } });
    return {
      userId: res[0].userId,
      email: res[0].email,
      firstName: res[0].firstName,
      lastName: res[0].lastName,
    };
  } catch (error) {
    throw error;
  }
};

exports.createUsers = async (ctx, user) => {
  try {
    const { Users } = ctx.sequelize.models;
    const res = await Users.create(user);
    return res;
  } catch (error) {
    throw error;
  }
};
