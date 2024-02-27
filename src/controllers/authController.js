const {
  successResponse,
  failedResponse,
} = require("../helper/responseHandler");
const { getUsers } = require("../models/Users");
const mockUser = require("../../mockUser.json");
const { v4: uuidv4, v4 } = require("uuid");
const { logger } = require("../helper/logger");

exports.login = async (ctx) => {
  try {
    const res = await getUsers();
    // logger.info(res);
    return successResponse(ctx, res, 200);
  } catch (error) {
    failedResponse(ctx, error);
  }
};

exports.createRandomUsers = async (ctx) => {
  try {
    console.log(mockUser.length);
    console.time("map");
    const users = mockUser.map((data) => ({
      userId: uuidv4(),
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      email: data.email,
      dob: data.dob,
    }));
    console.timeEnd("map");

    console.time("forEach");
    const a = [];
    mockUser.forEach((data) => {
      a.push({
        userId: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        dob: data.dob,
      });
    });
    console.timeEnd("forEach");

    console.time("forOf");
    const b = [];
    for (let data of mockUser) {
      b.push({
        userId: uuidv4(),
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        dob: data.dob,
      });
    }
    console.timeEnd("forOf");

    console.time("for");
    let c = [];
    for (let i = 0; i < mockUser.length; i++) {
      c.push({
        userId: uuidv4(),
        firstName: mockUser[i].firstName,
        lastName: mockUser[i].lastName,
        address: mockUser[i].address,
        email: mockUser[i].email,
        dob: mockUser[i].dob,
      });
    }
    console.timeEnd("for");

    console.time("while");
    let d = [];
    let i = mockUser.length - 1;
    while (i > 0) {
      d.push({
        userId: uuidv4(),
        firstName: mockUser[i].firstName,
        lastName: mockUser[i].lastName,
        address: mockUser[i].address,
        email: mockUser[i].email,
        dob: mockUser[i].dob,
      });
      i--;
    }
    console.timeEnd("while");
    logger.info("I am done");
    successResponse(ctx, {}, 200);
  } catch (error) {
    console.log(error);
    failedResponse(error);
  }
};
