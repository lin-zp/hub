const fileService = require('../service/file.service')
const userService = require('../service/user.service')

const {
  APP_HOST,
  APP_PORT,
} = require('../app/config')

class fileController {
  async saveAvatarInfo(ctx, next) {
    console.log('保存头像信息');

    try {
      console.log(ctx.req.file);
      const { filename, mimetype, size } = ctx.req.file;
      const { id } = ctx.user

      const result = await fileService.createAvatar(filename, mimetype, size, id)
      //保存图片地址到user表
      const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
      await userService.updateAvatarUrlById(avatarUrl, id)
      ctx.body = '上传头像成功'
    } catch (error) {
      console.log(error);
    }
  }

  async savePictureInfo(ctx,next) {
    try {
      console.log("保存照片");
      // 1.获取图像信息
      const files = ctx.req.files;
      const { id } = ctx.user;
      const { momentId } = ctx.query;
      console.log(ctx.query);

      // 2.将所有的文件信息保存到数据库中
      for (let file of files) {
        const { filename, mimetype, size } = file;
        console.log(filename, mimetype, size, id, momentId);
        await fileService.createFile(filename, mimetype, size, id, momentId);
      }

      ctx.body = '动态配图上传完成~'
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = new fileController()