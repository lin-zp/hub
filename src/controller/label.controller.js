const labelService = require('../service/label.service')

class labelController{
    async create(ctx, next) {
        console.log("创建标签");
        const { name } = ctx.request.body;
        const result = await labelService.create(name);
        ctx.body = result;
      }
    
      async list(ctx, next) {
        console.log("查询标签列表");
        const { limit, offset } = ctx.query;
        console.log({ limit, offset });
        const result = await labelService.getLabels(limit, offset);
        ctx.body = result;
      }
}

module.exports = new labelController()