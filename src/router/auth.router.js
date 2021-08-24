const router = require("koa-router")
const authRouter = new router()

const { Login,success } = require("../controller/auth.controller")
const { verifyLogin,verifyAuth,verifyPermission } = require("../middleware/auth.middleware")

authRouter.post("/login", verifyLogin, Login);
authRouter.post("/test", verifyAuth, success);
authRouter.get("/test2", verifyPermission, success);

module.exports = authRouter;
