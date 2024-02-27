const router = require("koa-router");
const healthController = require("./controllers/healthController");
const authController = require("./controllers/authController");
const routes = new router();
routes.get("/health", healthController.health);
routes.post("/login", authController.login);
routes.get("/create/random/users", authController.createRandomUsers);
module.exports = routes;
