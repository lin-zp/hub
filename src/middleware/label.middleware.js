const labelService = require("../service/label.service");

class labelsMiddleware{
    async verifyLabelsExists(){
        const { labels } = ctx.request.body;

        const newLabels = []
        for (const name of labels) {
            const labelResult = await labelService.getLabelByName(name);
            const label = { name }
            
            if(!labelResult){
                const result = await labelService.create(name)
                label.id = result.insertId
            }else{
                label.id = labelResult.id
            }
            newLabels.push(label)
        }
        ctx.labels = newLabels;
        await next()
    }
}

module.exports = new labelsMiddleware()