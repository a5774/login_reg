const connection = require('../app/database');
class PermissionService{
    async checkResource(tableName,resoureceID,userID){
        // console.log( resoureceID,userID,tableName);
        const statement = `
        SELECT * FROM ${tableName} WHERE user_id = ? and id = ?;
        `;
        return await connection.poolPromise.execute(statement,[userID,resoureceID])
    }
}
module.exports = new PermissionService();