// const authRouter = require("../router/auth.router")
const { PRIVATE_KEY } = require("../app/config")
const { PUBLIC_KEY } = require("../app/config")
const jwt = require("jsonwebtoken")

class authController {
    async Login(ctx){
        const { id,name } = ctx.user;
        const token = jwt.sign({id,name},PRIVATE_KEY,{
            // algorithm:"HS256",
            algorithm:"RS256",
            expiresIn:60*24
        })
        ctx.header.authorization = token
        console.log(ctx.header);
        ctx.body = { id,name,token }
    };
    async success(ctx){
        // console.log(ctx.header);
        ctx.body = "授权成功"
    }
}

module.exports = new authController()