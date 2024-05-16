const router = require("koa-router");
const userController = require("../controllers/userController");
const campaignController = require("../controllers/campaignController");
const ollamaController = require("../controllers/ollamaController");
const { verifyToken } = require("../middleware/AuthMiddleware");

const routes = new router();

routes.use(verifyToken);
routes.get("/api/v1/user", userController.getUser);
routes.post("/api/v1/campaign", campaignController.createCampaign);
routes.post("/api/v2/campaign", campaignController.createCampaignV2);
routes.get(
  "/api/v1/campaign/download/:pageId",
  campaignController.downloadCampaignScript
);
routes.get(
  "/api/v1/campaign/scripts/:campaignId",
  campaignController.getCampaignScripts
);
routes.get("/api/v1/campaign/pages", campaignController.getCampaignPages);
routes.get(
  "/api/v1/campaign/pages/:pageId",
  campaignController.getCampaignPageById
);
routes.get(
  "/api/v1/campaign/ctr/:pageId",
  campaignController.getCampaignCTRById
);
routes.post("/api/v1/ollama/ask", ollamaController.askOllama);

module.exports = routes;
