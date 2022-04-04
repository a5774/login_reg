const fileServie = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/filePath')
const { HOST_NAME,TEST_PORT } = require('../app/config');
class FileController{
    async saveAvatarInfo(ctx,next){ 
        // const {} =  ctx.req.body ;
        // single
        const { id } = ctx.userInfo;
        const { filename,mimetype,size,path } = ctx.req.file;
        try{
            // save avatarinfo 
            const [reslut] = await fileServie.crateAvatarInfo(filename,mimetype,size,id);
            const avatar_url = `${HOST_NAME}:${TEST_PORT}/users/${id}/avatar`
            // console.log( avatar_url );
            // sava avatar_url for users ,insertId -> current_avatar_id 
            await userService.updateUserInfo(reslut['insertId'],avatar_url,id);
            ctx.body = 'done' ;
        }catch(err){
            console.log(err );
        }
    }
    async savePictureInfo(ctx,next){
        const { id } = ctx.userInfo
        const { momentID } = ctx.query;
        const files =  ctx.req.files;
        for (const file of files) {            
            const { filename,mimetype,size } = file;
            await fileServie.createPictureInfo(filename,mimetype,size,id,momentID);
        }
        ctx.body = "done ";
    }
}
module.exports = new FileController();