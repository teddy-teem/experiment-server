exports.register = async (ctx, user) => {
  try {
    const { Auth } = ctx.sequelize.models;
    const auth = await Auth.create(user);
    return { authId: auth.authId };
  } catch (error) {
    throw error;
  }
};

exports.getAuthDetailsByEmail = async (ctx, email) => {
  try {
    console.log("ema", email);
    const { Auth } = ctx.sequelize.models;
    const resp = await Auth.findByPk(email);
    if (!resp) {
      return {};
    }
    return { email: resp.email, hashPassword: resp.password };
  } catch (error) {
    throw error;
  }
};
