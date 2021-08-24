const Multer = require('koa-multer')
const Jimp = require('jimp')
const path = require('path')

const { AVATAR_PATH, PICTURE_PATH, LARGE, MIDDLE, SMALL } = require('../constants/file-path')

const avatarUpload = Multer({
    dest: AVATAR_PATH
})
const pictureUpload = Multer({
    dest: PICTURE_PATH
})

const avatarHandler = avatarUpload.single('avatar')

const pictureHandler = pictureUpload.array('picture', 9)
// 接受上传多个文件

const pictureResize = async (ctx, next) => {
    //获取图像信息
    try {
        const files = ctx.req.files;
        // ctx.req/res 是原生的请求/回复对象
        // ctx.request/response 是koa封装的请求/回复对象
        //对图像进行处理
        for (let file of files) {
            const destPath = path.join(file.destination, file.filename);
            console.log(file.destination);
            console.log(file.filename);
            Jimp.read(destPath).then(Image => {
                Image.resize(LARGE, Jimp.AUTO).write(`${destPath}-large`);
                Image.resize(MIDDLE, Jimp.AUTO).write(`${destPath}-middle`);
                Image.resize(SMALL, Jimp.AUTO).write(`${destPath}-small`);
            })
        }
    } catch (error) {
        console.log(error);
    }

    await next();
}
// }

module.exports = { avatarHandler, pictureHandler, pictureResize }

