const validator = require("validator");

exports.validateRegisterRequestBody = (data) => {
  if (!validator.isEmail(data.email)) {
    throw { status: 400, message: "Email is not valid." };
  }
  if (!validator.isStrongPassword(data.password)) {
    throw {
      status: 400,
      message: "Password is not strong enough.",
      hints:
        "{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }",
    };
  }
  if (!validator.isStrongPassword(data.confirmPassword)) {
    throw {
      status: 400,
      message: "Password is not strong enough.",
      hints:
        "{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }",
    };
  }
  if (!validator.isAlpha(data.firstName)) {
    throw {
      status: 400,
      message: "Provided name is not a valid name.",
      hints:
        "Name must contain only alphabet, there might be blank space, remove that",
    };
  }
  if (!validator.isAlpha(data.lastName)) {
    throw {
      status: 400,
      message: "Provided name is not a valid name.",
      hints:
        "Name must contain only alphabet, there might be blank space, remove that",
    };
  }
  return true;
};

exports.validateLoginRequestBody = (data) => {
  if (!validator.isEmail(data.email)) {
    throw { status: 400, message: "Email is not valid." };
  }
  if (!validator.isStrongPassword(data.password)) {
    throw {
      status: 400,
      message: "Password is not strong enough.",
      hints:
        "{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }",
    };
  }
  return true;
};

exports.validateJWT = (data) => {
  if (!data) {
    throw {
      status: 401,
      message: "Authorization token is required.",
    };
  }
  if (!validator.isJWT(data)) {
    throw { status: 400, message: "is not a valid jwt token." };
  }
  return true;
};
