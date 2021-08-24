const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create,reply,update,remove,list } = require('../controller/comment.contorller')

const commentRouter = new Router({prefix:'/comment'})

// 发表评论
commentRouter.post('/',verifyAuth,create)
// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, reply);
//修改评论
commentRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
//删除评论
commentRouter.delete('/:commentId',verifyAuth, verifyPermission, remove)

//获取评论列表
commentRouter.get('/', list);

module.exports = commentRouter
// 由于使用文件名自动生成路由，未导出时会报此错误
// TypeError: router.routes is not a function
//     at D:\597\NodeJs\hub\src\router\index.js:23:21