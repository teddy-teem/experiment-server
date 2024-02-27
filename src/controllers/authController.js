const {
  successResponse,
  failedResponse,
} = require("../helper/responseHandler");
const { getUsers, createUsers } = require("../models/Users");
const mockUser = require("../../mockUser.json");
const { v4: uuidv4, v4 } = require("uuid");

exports.login = async (ctx) => {
  try {
    const res = await getUsers(ctx);
    return successResponse(ctx, res, 200);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.createRandomUsers = async (ctx) => {
  try {
    console.log(mockUser.length);
    console.time("user-create");
    mockUser.forEach(async (data) => {
      await createUsers(ctx, {
        userId: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        dob: data.dob,
      }).catch((e) => {
        throw e;
      });
    });
    console.timeEnd("user-create");

    successResponse(ctx, { message: "Successfully created" }, 200);
  } catch (error) {
    console.log(error);
    failedResponse(error);
  }
};
