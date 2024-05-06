const router = require("koa-router");
const userController = require("../controllers/userController");

const routes = new router();

routes.get("/api/v1/user", userController.getUser);

module.exports = routes;
