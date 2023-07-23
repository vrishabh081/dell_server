const { signUp, logIn } = require("../controllers/authController");
const authRouter = require("express").Router();

// Auth Routes-
authRouter.route("/signup").post(signUp);
authRouter.route("/login").post(logIn);

// Export-
module.exports = authRouter;