const jwt = require('jsonwebtoken');
const { PUBLIC_KEY, PRIVATE_KEY } = require('../app/config')
const errorTypes = require('../constants/errorTypes')
const userService = require('../service/user.service')
const permissionService = require('../service/permission.service')
    const { encryption } = require('../untils/encryption')
class VerifyAuth {
    //verify user info is Legitimacy 
    async verifyLogin(ctx, next) {
        // login info is empty 
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            const err = new Error(errorTypes.USERNAME_OR_PASSWORD_CAN_NOT_BE_EMPTY);
            return ctx.app.emit("error", err,ctx);
        }
        // Does the user exist
        // let [[{username:value = undefined,password:key = undefined}],[]] = await service.getUserName(username);
        let [[reslut]] = await userService.hasExistUser(username);
        // console.log( reslut);
        // console.log(reslut.toString());
        if(!reslut){
            const err = new Error(errorTypes.USERNAME_DOES_NOT_EXISTS);
            return ctx.app.emit("error",err,ctx)
        }
        // Does the password correct
        if(reslut.password != encryption(password)){
            const err = new Error(errorTypes.PASSWORD_ERROR);
            return ctx.app.emit("error",err,ctx);
        }
        // console.log( reslut);
        // set userInfo 
        Reflect.set(ctx,'userInfo',{id:reslut.id,username:reslut.username});
        await next();
    }
    // verify user is logged in 
    async verifyToken(ctx,next){
        let {authorization} = ctx.req.headers;
        // verify authorization is exists 
        if(!authorization){
            const error = new Error(errorTypes.UNAUTHORIZED)
            return ctx.app.emit("error",error,ctx);
        }
        let token = authorization.replace('Bearer ','');
        // let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTY0MDYwNTE1NCwiZXhwIjoxNjQyMjQ1NzU5ODkwfQ.V_U4IMoBkr3vmNEwUe5haYNSs-0iyDaGpwjYTQNq98K178Zt_PAJ0K57tC3lcZCHrZguvjapP8IsOPFjB83NQxWTi0q2N3362qxPwZ_uClO42ZPbMI-RhRyYxOiTJoxP1l8dSAWkX8HQcSegeTmifE8MktDqZkpUo5JI-Srne9I'
        
        // console.log( token );
        try{
            // token verify 
            const info = jwt.verify(token,PRIVATE_KEY,{
                algorithms:['RS256','HS256',]
            })
            Reflect.set(ctx,'userInfo',info)
            console.log( info );
        }catch(err){    
            // err decide
            if(/invalid/gi.test(err.message)){
                const error = new Error(errorTypes.UNAUTHORIZED)
                return ctx.app.emit("error",error,ctx);
            }
            if(/expired/gi.test(err.message)){
                const error = new Error(errorTypes.AUTHORIZEDEXPIRED)
                return ctx.app.emit("error",error,ctx);
            }
        }   
        // console.log( "token verify pass ");
        await next();
    }
    async verifyPermission(ctx, next){
        // Array[ObjectkeY]
        let [ resourceTypeKey ] = Object.keys(ctx.params);
        let  resoureceID  = ctx.params[resourceTypeKey];
        // only once
        let resoureceType = resourceTypeKey.replace('ID','');
        let { id } = ctx.userInfo;
        // console.log( momentID,id);
        try {
            // check permission
            const [isPermission] = await permissionService.checkResource(resoureceType,resoureceID,id);
            // console.log( isPermission);
            // [].toString() == false 
            if (!isPermission.toString()) throw new Error("error");
        } catch{
            const error = new Error(errorTypes.UNPERMISSION);
            return ctx.app.emit("error",error,ctx);
        }
        await next();
    }
    // closure
    /* verifyPermission(resourceType){
        return async(ctx, next)=>{
            let { momentID } = ctx.params;
            let { id } = ctx.userInfo;
            // console.log( momentID,id);
            try {
                // check permission
                const [isPermission] = await permissionService.checkResource(resourceType,momentID, id);
                // console.log( isPermission);
                // [].toString() == false 
                if (!isPermission.toString()) throw new Error("error");
            } catch{
                const error = new Error(errorTypes.UNPERMISSION);
                return ctx.app.emit("error",error,ctx);
            }
            await next();
        }
    }
 */
}
module.exports = new VerifyAuth();