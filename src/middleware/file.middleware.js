const Multer = require('koa-multer')
const Jimp = require('jimp')
const {AVATAR_PATH,PICTURE_PATH,LARGE,MIDDLE,SMALL} = require('../constants/file-path')

const avatarUpload = Multer({
    dest:AVATAR_PATH
})
const pictureUpload = Multer({
    dest:PICTURE_PATH
})

class fileMiddler{
    async avatarHandler(ctx,next){
        // 接受上传单个文件
        avatarUpload.single('avatar')
    }

    async pictureHandler(ctx,next){
        // 接受上传多个文件
        pictureUpload.array('picture',9)
    }

    async pictureResize(ctx,next){
        //获取图像信息
        const files = ctx.req.files;
        // ctx.req/res 是原生的请求/回复对象
        // ctx.request/response 是koa封装的请求/回复对象

        //对图像进行处理
        for (let file of files) {
            const destPath = path.join(file.destination, file.filename);
            
            Jimp.read('destPath').then(Image =>{
                Image.resize(LARGE, Jimp.AUTO).write(`${destPath}-large`);
                Image.resize(MIDDLE, Jimp.AUTO).write(`${destPath}-large`);
                Image.resize(SMALL, Jimp.AUTO).write(`${destPath}-large`);
            })
        }
        await next();
    }
}

module.exports = new fileMiddler()