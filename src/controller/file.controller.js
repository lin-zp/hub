const fileService = require('../service/file.service')
const userService = require('../service/user.service')

const {
    APP_HOST,
    APP_PORT,
} = require('../app/config') 

class fileController{
    async saveAvatarInfo(ctx,next){
        const { filename, mimetype, size } = ctx.req.file;
        const { id } = ctx.user

        const result = await fileService.createAvatar(filename, mimetype, size, id)

        //保存图片地址到user表
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await userService.updateAvatarUrlById(avatarUrl, id)

        ctx.body = '上传头像成功'
    }

    async savePictureInfo(){
          // 1.获取图像信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    // 2.将所有的文件信息保存到数据库中
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await fileService.createFile(filename, mimetype, size, id, momentId);
    }

    ctx.body = '动态配图上传完成~'
  }  
}


module.exports = new fileController()