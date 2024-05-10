const router = require("koa-router");
const healthController = require("../controllers/healthController");
const authController = require("../controllers/authController");
const ctrController = require("../controllers/ctrController");

const routes = new router();

routes.get("/health", healthController.health);
routes.get("/api/v1/ctr/:pageId", ctrController.countCTR);
routes.post("/api/v1/login", authController.login);
routes.post("/api/v1/register", authController.register);

module.exports = routes;
