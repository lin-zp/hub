const userService = require("../service/user.service")
const errorType = require("../constants/errorType")
const md5password = require("../utils/password-handle")

const verifyUser = async(ctx,next)=>{
    const {name,password} = ctx.request.body
    //判断用户名密码是否为空
    if(!name||!password){
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        /*
        errorHandler()中需要使用ctx的参数设置状态和错误内容，因此需要返回(error,ctx)给
        事件监听
        */
        return ctx.app.emit('error',error,ctx)
    }

    //判断此用户是否注册过
    const result = await userService.getUserName(name)
    if(result.length){
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    await next()
}

const handlePassword = async(ctx,next)=>{
    const  password  = ctx.request.body.password;
    ctx.request.body.password = md5password(password)
    console.log(ctx.request.body.password);
    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}