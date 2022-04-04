// const connection = require('../app/database')
// const errorTypes = require('../constants/errorTypes')
// const permissionService = require('../service/permission.service')
// class MomentVerify {
   /*  async maxMomentID(ctx, next) {
        let { momentID } = ctx.params;
        const statement = `SELECT COUNT(id) as maxCount FROM moment `
        // let [[{}],[]] = [[{}],[]]
        const [[{ maxCount: maxMomentID }]] = await connection.poolPromise.query(statement);
        if (momentID > maxMomentID) {
            const err = new Error(errorTypes.MOMENTIDGTMAX)
            return ctx.app.emit("error", err, ctx);
        }
        await next();
    }
    async maxUserID(ctx, next) {
        let { userID } = ctx.params;
        const statement = `SELECT COUNT(id) as maxCount FROM users `
        const [[{ maxCount: maxUserID }]] = await connection.poolPromise.query(statement);
        if (userID > maxUserID) {
            const err = new Error(errorTypes.USERIDGTMAX)
            return ctx.app.emit("error", err, ctx);
        }
        await next();
    } */
   /*  async verifyPermission(ctx, next) {
        let { momentID } = ctx.params;
        let { id } = ctx.userInfo;
        // console.log( momentID,id);
        try {
            // check permission
            const [isPermission] = await permissionService.checkMoment(momentID, id);
            // console.log( isPermission);
            // [].toString() == false 
            if (!isPermission.toString()) throw new Error("error");
        } catch{
            const error = new Error(errorTypes.UNPERMISSION);
            return ctx.app.emit("error",error,ctx);
        }
        await next();
    } */
// }
// module.exports = new MomentVerify();
