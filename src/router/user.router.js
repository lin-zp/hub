const Router = require("koa-router")
const { create } = require("../controller/user.contorller")
const { verifyUser,handlePassword } = require("../middleware/user.middleware")

const userRouter = new Router({prefix:"/user"})

userRouter.post('/',verifyUser, handlePassword, create)

module.exports = userRouter;