const userService = require("../service/user.service")

class userController {
    async create(ctx,next){
        // console.log(ctx.request.body)
        // ctx.body = "用户创建成功"
        const user = ctx.request.body
        const result = await userService.create(user)
        console.log(result);
        ctx.body = result
    }

    async avatarInfo(ctx,next){
        try {
            console.log(ctx.user);
        const {id} = ctx.user
        const result = await userService.getAvatarByUserid(id)

        ctx.body = result
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new userController();