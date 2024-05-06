const router = require("koa-router");
const dbController = require("../controllers/dbController");

const routes = new router();

routes.get("/api/v1/table/list", dbController.getTableList);

module.exports = routes;
