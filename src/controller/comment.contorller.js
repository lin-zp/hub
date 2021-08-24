const commentService = require('../service/commemt.service')

class commentController {
    async create(ctx, next) {
        const { momentId, content } = ctx.request.body
        const { id } = ctx.user
        // console.log({ momentId, content });

        const result = await commentService.create(momentId, content, id)
        ctx.body = result
    }

    async reply(ctx, next) {
        const { momentId, content } = ctx.request.body;
        const { commentId } = ctx.params;
        const { id } = ctx.user;

        const result = await commentService.reply(momentId, content, id, commentId);
        ctx.body = result;
    }

    async update(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await commentService.update(commentId, content);
        ctx.body = result;
      }
    
      async remove(ctx, next) {
        const { commentId } = ctx.params;
        const result = await commentService.remove(commentId);
        ctx.body = result;
      }

      async list(ctx, next) {
        const { momentId } = ctx.query;
        // console.log(momentId);
        const result = await commentService.getCommentsByMomentId(momentId);
        console.log(result);
        ctx.body = result;
      }
}

module.exports = new commentController()