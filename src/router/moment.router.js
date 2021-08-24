const Router = require('koa-router')

const { create, list,detail,update,remove,addLabel } = require('../controller/moment.contorller')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

const { verifyLabelsExists } = require('../middleware/label.middleware')

momentRouter = new Router({prefix:'/moment'})

//创建动态
momentRouter.post('/',verifyAuth,create)

// 获取动态数据
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)

// 更新动态，需登录且具备权限
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

//给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelsExists,addLabel)

//给动态配图


module.exports = momentRouter