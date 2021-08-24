const labelService = require("../service/label.service");

class labelsMiddleware {
    async verifyLabelsExists(ctx,next) {
        try {
            const { labels } = ctx.request.body;
            const newLabels = []
            for (let name of labels) {
                //遍历数组labels，传进来的labels需要是数组形式，如{"labels":["傻瓜","测试","回复"]}
                const labelResult = await labelService.getLabelByName(name);
                const label = { name }

                if (!labelResult) {
                    const result = await labelService.create(name)
                    label.id = result.insertId
                } else {
                    label.id = labelResult.id
                    // console.log(label);
                }
                newLabels.push(label)
            }
            ctx.labels = newLabels;
            await next()
        } catch (error) {
            console.log(error);
        }

    }
}

module.exports = new labelsMiddleware()