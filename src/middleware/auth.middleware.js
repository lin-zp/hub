const jwt = require("jsonwebtoken")

const userService = require("../service/user.service")
const errorType = require("../constants/errorType")
const authService = require("../service/auth.service")
const md5password = require("../utils/password-handle")
const { PUBLIC_KEY } = require("../app/config")
const { query } = require("../app/database")

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  //判断用户名密码是否为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    /*
    errorHandler()中需要使用ctx的参数设置状态和错误内容，因此需要返回(error,ctx)给
    事件监听
    */
    return ctx.app.emit('error', error, ctx)
  }

  //判断用户是否存在
  const result = await userService.getUserName(name)
  const user = result[0]
  // console.log(result.length);用户存在时，返回1
  if (!result.length) {
    // console.log("用户不存在");
    const error = new Error(errorType.USER_IS_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  //判断用户名密码是否匹配
  // const result1 = await authService.verifyPassword(name)
  // console.log(result1[0].password);  
  // console.log(md5password(password));
  if (md5password(password) !== user.password) {
    // console.log(user.password);
    const error = new Error(errorType.USER_PASSWORD_ERROR)
    console.log("密码错误");
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  // console.log(ctx.header);

  await next()
}

const verifyAuth = async (ctx, next) => {
  /**
   * 验证登录token权限
   */

  const authorization = ctx.header.authorization;
  // console.log(authorization);
  if (!authorization) {
    console.log("token无效，打印错误信息");
    const error = new Error(errorType.USER_UNAUTHORIZATION)
    // console.log(ctx);
    return ctx.app.emit('error', error, ctx)
  }

  const token = authorization.replace('Bearer ', "")
  // console.log(token);
  // 2.验证token(id/name/iat/exp)
  try {
    // console.log(token);
    const tokenResult = jwt.verify(token, PUBLIC_KEY, {
      algorithms: "RS256"
    })
    console.log(tokenResult);
    console.log("-------------");

    ctx.user = tokenResult;
    await next();
  } catch (err) {
    console.log("token进入错误");
    const error = new Error(errorType.USER_UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx);
    // console.log(err.message);
  }
}


const verifyPermission = async (ctx, next) => {
  console.log("权限验证中间件");
  //获取params参数，可供多个接口进行复用
  const [resourceKey] = Object.keys(ctx.params);
  // console.log([resourceKey]);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;

  try {
    // console.log("开始验证1");

    const isPermission = await authService.checkResource(tableName, resourceId, id)
    // console.log(isPermission);
    if (!isPermission) throw new Error();
    await next()
  } catch (error) {
    const err = new Error(errorTypes.UNPERMISSION);
    console.log("permission_test2");

    return ctx.app.emit('error', err, ctx);
  }
}

module.exports = {
  verifyAuth,
  verifyLogin,
  verifyPermission
}