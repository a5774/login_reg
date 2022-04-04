const connection = require('../app/database')
class UserService{
    // create user 
    async create(username,password){
        // console.log( username,password );
        let statementPrep = `INSERT INTO users (username,password) VALUES (?,?)`
       /*  connection.pool.execute(statementPrep,[username,password],(err,res,field)=>{
           if(err) console.log("err："+err.message);
        })
        return "create done" */
        
        // Sqlstring,value[]
        // [{},[field]]
        return await connection.poolPromise.execute(statementPrep,[username,password]);
    };
    // check username 
    async hasExistUser(username){
        const statementPrep = `SELECT * FROM users WHERE username = ?`
        // [[reslut],[field]]
        return await connection.poolPromise.execute(statementPrep,[username])
    }
    // init user avatar
    async updateUserInfo(avatarID,url,id){
         const statement = `
         UPDATE users SET current_avatar_id = ?,avatar_url = ? WHERE id = ?
         `
         return await  connection.poolPromise.execute(statement,[avatarID,url,id]);
    }
    // change user avatar 
    async updateAvatarId(avatarID,id){
        const statement = `
         UPDATE users SET current_avatar_id = ? WHERE id = ?
         `
         return await  connection.poolPromise.execute(statement,[avatarID,id]);
    }

    
}
module.exports = new UserService()