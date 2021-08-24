const errorType = require("../constants/errorType")

const errorHandler = (error,ctx)=>{
    let status,message;

    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = "用户名或密码不能为空"
            break;
            
        case errorType.USER_ALREADY_EXISTS:
            status = 409;
            message = "此用户已存在"
            break;
            
        case errorType.USER_IS_NOT_EXISTS:
            status = 400;
            message = "此用户不存在"
            break;
        
        case errorType.USER_PASSWORD_ERROR:
            status = 400;
            message = "用户密码错误"
            break;

            case errorType.UNPERMISSION:
                status = 401; // 参数错误
                message = "您不具备操作的权限~";
                break;

            case errorType.USER_UNAUTHORIZATION:
                status = 401;
                message = "无效的token"
                break;
        

        default:
            status = 404;
            message = "NOT FOUND"
            break;
    }
    ctx.status = status;
    ctx.body = message
}

module.exports = errorHandler
