const appPort = process.env.APP_PORT || 8082;
const appHost = process.env.APP_HOST || "localhost";
const env = process.env.APP_ENV || "dev";
const mysqlPassword = `${process.env.MYSQL_PASSWORD}#*`;
const hashSalt = 10;
const secretKey = "your-secret-key";
const gptApiKey = process.env.GPT_API_KEY || "";

const variables = {
  appPort,
  appHost,
  env,
  mysqlPassword,
  hashSalt,
  secretKey,
  gptApiKey,
};

module.exports = variables;
