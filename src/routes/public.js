const router = require("koa-router");
const healthController = require("../controllers/healthController");
const authController = require("../controllers/authController");
const ctrController = require("../controllers/ctrController");
const ollamaController = require("../controllers/ollamaController");

const routes = new router();

/**
 * @swagger
 * /health:
 *   get:
 *     description: Check API Health
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "I am healthy"
 *             info:
 *               type: null
 *             data:
 *               type: null
 *             link:
 *               type: null
 *
 *       '500':
 *         description: Internal Server Error. The API service encountered an error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the error that occurred.
 *                   example: An unexpected error occurred.
 *     security:
 *       - bearerAuth: []  # Add security scheme if authentication is required
 */
routes.get("/health", healthController.health);

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login
 *     description: Logs in a user and returns an access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password123 (**Please note:** This is an example for demonstration purposes. Never expose actual passwords in documentation.)
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful login.
 *                   example: login success
 *                 info:
 *                   type: object
 *                   description: (Optional) Additional information.
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: The access token for the logged-in user.
 *                       example: asdasda
 *                 link:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: string
 *                       description: A link to the user's profile (optional).
 *                       example: /user
 *       '400':
 *         description: Bad Request. Invalid request body or missing fields.
 *       '401':
 *         description: Unauthorized. Invalid credentials or missing authentication.
 *     security: []  # Replace with your security scheme (e.g., basic auth)
 */

routes.post("/api/v1/login", authController.login);
routes.post("/api/v1/register", authController.register);
routes.get("/api/v1/ctr/:pageId", ctrController.countCTR);

module.exports = routes;
