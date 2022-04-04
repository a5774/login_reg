const fs = require('fs')
const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/filePath')
class UserController {
    async create(ctx,next) {
        let { username,password } = ctx.request.body
        let reslut = await userService.create(username,password);
        console.log( reslut );
        // ctx.body = reslut;
    }
    async avatarDetails(ctx, next) {
        // let body ;
        let { userID } = ctx.params;
        try {
            // left join 
            const [reslut] = await fileService.getAvatarInfoByUser(userID);
            const [{mimetype,filename}] = reslut;
            // v16.1
            // let fd = await fs.promises.open(`${AVATAR_PATH}/${reslut.filename}`,'r+');s
            // set response Headers
            ctx.response.type = mimetype;
            console.log(`${AVATAR_PATH}/${filename}`);
            // ctx.response.set('Content-type',avatarInfo.mimetype);
            let ReadStream = fs.createReadStream(`${AVATAR_PATH}/${filename}`, {
                // 字节操作不建议指定编码
                // encoding:"utf-8",
                flags: "r+",
                autoClose: true,
                emitClose: true,
                highWaterMark: 64 * 1024
            });
            ctx.body = ReadStream;

            // enable
            //  ctx.body = fs.readFileSync(`${AVATAR_PATH}/${avatarInfo.filename}`,{flag:"r+"})

            
            /*   console.log( ReadStream.readableFlowing);
              // ReadStream.resume()
              // 流动模式  添加data句柄 主动生成数据
              ReadStream.addListener("data",data=>{
                  // console.log( "admin");
                  console.log( data);//buffer
                  //  body += data ;
                  // 切换暂停模式
                  // ReadStream.pause();
                  
              })
              ReadStream.addListener('end',()=>{
                  // ctx.body = body;
                  // console.log( body );
              }) */

            //readble 将多次触发 添加reable事件将进入暂停模式,data事件失效
            // 当有可从流中读取的数据或已到达流的末尾时触发
            /*  ReadStream.addListener('readable',()=>{
                 // 当缓冲区存在数据则读取 否则为null
                 // console.log( ReadStream.read(10));
             }) */
            // safe to call Rs.read ,Stream not destroy
            // console.log( ReadStream.readable);
            //    console.log( ReadStream.readableFlowing);
            // fs.createWriteStream("./controller/flag.txt").write({key:"value"});
        } catch (err) {
            console.log(err);
        }
    }
    async AvatarsDetails(ctx,next){
        const { avatarID } = ctx.params;
        const [reslut] = await fileService.getAvatarsDetails(avatarID);
        const [{ filename,mimetype }] = reslut;
        ctx.response.type = mimetype;
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${filename}`)
    }

    async avatarInfoList(ctx, next) {
        // for token
        const { id } = ctx.userInfo;
        const [reslut] = await fileService.getAvatarsInfoByUser(id);
        ctx.body = reslut;
    }

    async modifyAvatar(ctx, next) {
        const { id } = ctx.userInfo;
        const { avatarID } = ctx.params;
       try{
        const [reslut] = await userService.updateAvatarId(avatarID,id);
        ctx.body = reslut;
       }catch(err){
           console.log( err);
       }
    }
}
module.exports = new UserController();