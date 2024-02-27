exports.getUsers = async (ctx) => {
  try {
    // const [results, fields] = await ctx.dbConnection.execute(
    //   "SELECT * FROM `Users`"
    // );
    return true;
  } catch (error) {
    throw error;
  }
};

exports.createUsers = async (ctx, user) => {
  try {
    // const [results, fields, error] = await ctx.dbConnection.execute(
    //   `INSERT INTO Users (userId, firstName, lastName, email, address, dob) VALUES (${user.userId}, ${user.firstName}, ${user.lastName}, ${user.email}, ${user.address}, ${user.dob} )`
    // );
    // const [results, fields, error] = await ctx.dbConnection
    //   .execute(`INSERT INTO Users (userId, firstName, lastName, email, address, dob)
    // VALUES ('7a64cb3c-15bf-436d-a0da-a0f95fc133fa', 'Leticia', 'Hyde', 'leticia_hyde@mailinator.com', '52 Dunham Place, Coldiron, Oklahoma', '1993-08-10')`);
    // console.log(error);
    return {};
  } catch (error) {
    throw error;
  }
};
