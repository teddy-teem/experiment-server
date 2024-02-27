const { getDbConnection } = require("../helper/dbConnector");
exports.getUsers = async () => {
  try {
    const connection = await getDbConnection({ database: "experimental" });
    const [results, fields] = await connection.execute("SELECT * FROM `Users`");
    return results;
  } catch (error) {
    throw error;
  }
};

exports.createUsers = async (user) => {
  try {
    const connection = await getDbConnection({ database: "experimental" });
    const [results, fields] =
      await connection.execute(`INSERT INTO Users (userId, firstName, lastName, email, address, dob)
    VALUES (${user.userId}, ${user.firstName}, ${user.lastName}, ${user.email}, ${user.address}, , ${user.dob} )`);
    return results;
  } catch (error) {
    throw error;
  }
};
