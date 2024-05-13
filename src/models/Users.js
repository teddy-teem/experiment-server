exports.getUser = async (ctx, userId) => {
  try {
    const { Users } = ctx.sequelize.models;
    const res = await Users.findByPk(userId);
    return {
      userId: res.userId,
      email: res.email,
      firstName: res.firstName,
      lastName: res.lastName,
      dob: res.dob,
      address: res.address,
      createdAt: res.createdAt,
      updatedAt: res.updatedAt,
    };
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
