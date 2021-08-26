const fs = require('fs')

const momentService = require('../service/moment.service');
const fileService = require('../service/file.service')
const { PICTURE_PATH } = require('../constants/file-path')

class momentController {
    async create(ctx, next) {
        // 1.获取数据(user_id, content)
        const userId = ctx.user.id;
        const content = ctx.request.body.content;
        console.log(ctx.user);
        console.log(content);

        // 2.将数据插入到数据库
        const result = await momentService.create(userId, content);
        console.log(result[0]);
        ctx.body = result[0];
    }

    async list(ctx, next) {
        // 通过offest和size获取数据
        const { offset, size } = ctx.query;

        const result = await momentService.getMomentList(offset, size)
        ctx.body = result[0]
    }

    async detail(ctx, next) {
        const momentId = ctx.params.momentId

        // 根据id查询这条数据
        const result = await momentService.getMomentById(momentId);
        ctx.body = result[0]
    }

    async update(ctx, next) {
        console.log("更新动态");
        try {
            const { content } = ctx.request.body
            const { momentId } = ctx.params

            const result = await momentService.update(content, momentId)
            ctx.body = result[0]
        } catch (error) {
            console.log(error);
        }
    }

    async remove(ctx, next) {
        console.log("删除动态");
        const { momentId } = ctx.params

        const result = await momentService.remove(momentId);
        ctx.body = result
    }

    async addLabel(ctx, next) {
        const { labels } = ctx;
        const { momentId } = ctx.params

        for (let label of labels) {
            const isExist = await momentService.hasLabels(momentId, label.id)
            console.log(!isExist);
            if (!isExist) {
                await momentService.addLabel(momentId, label.id)
            }
            ctx.body = "给动态添加标签成功~";
        }
    }

    async fileInfo(ctx, next) {
        try {
            console.log("查看图片");
            let { filename } = ctx.params;
            const fileInfo = await fileService.getFileByFilename(filename);
            const { type } = ctx.query;
            const types = ["small", "middle", "large"];
            if (types.some(item => item === type)) {
                filename = filename + '-' + type;
            }

            ctx.response.set('content-type', fileInfo.mimetype);
            console.log("查看图片成功");
                ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
            
        } catch (error) {
            console.log(error);
        }

    }
}


module.exports = new momentController()

