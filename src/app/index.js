const koa = require('koa')
const bodyParser = require('koa-bodyparser');
const errorHandler = require("./errorHandle")
const useRoutes = require('../router/index')
const cors = require('koa-cors')

const app = new koa()



app.use(bodyParser())
app.use(cors())
app.useRoutes = useRoutes;
// app.use(userRouter.routes(),userRouter.allowedMethods())
app.useRoutes();
app.on('error',errorHandler)

module.exports = app