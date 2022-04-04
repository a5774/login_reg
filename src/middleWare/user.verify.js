const errorTypes = require('../constants/errorTypes'); 
const userService = require('../service/user.service')
const { encryption } = require('../untils/encryption')
class VerifyReg{
    async verifyUser(ctx,next){
        let { username ,password } = ctx.request.body;
        // console.log( username ,password );
        // verify userInfo Cannot be empty 
        if(!username || !password){
            const err = new Error(errorTypes.USERNAME_OR_PASSWORD_CAN_NOT_BE_EMPTY);
            // emit err info 
            return ctx.app.emit("error",err,ctx);
        }
        //verify user is already
        let [reslut]  = await userService.hasExistUser(username)
        // when [reslut] is empty user is not exists 
        if(reslut.length){
            const err = new Error(errorTypes.USERNAME_IS_EXISTS)
            return ctx.app.emit("error",err,ctx);
        }
        // 等待数据库操作完成,
        await next();
    }
    async Encryption(ctx,next){
        // Before encryption
        let { password } = ctx.request.body
        // encryption 
        ctx.request.body.password = encryption(password)
        await next();
    }

}   
module.exports = new VerifyReg();
