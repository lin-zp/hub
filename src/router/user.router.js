const Router = require("koa-router")
const { create,avatarInfo } = require("../controller/user.contorller")
const { verifyUser,handlePassword } = require("../middleware/user.middleware")
const { verifyAuth,verifyPermission } = require('../middleware/auth.middleware')
const { saveAvatarInfo } = require("../controller/file.controller")

const userRouter = new Router({prefix:"/user"})

userRouter.post('/',verifyUser, handlePassword, create)
userRouter.get('/avatar',verifyAuth,avatarInfo)

module.exports = userRouter;