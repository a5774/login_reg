const connection = require('../app/database');
class FileServive{
    async crateAvatarInfo(filename,mimetype,filesize,userID){
        const statement = `
        INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)
        `
        return await connection.poolPromise.execute(statement,[filename,mimetype,filesize,userID])
    }
    async createPictureInfo(filename,mimetype,filesize,userID,momentID){
        const statement = `
        INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?)
        `
        return await connection.poolPromise.execute(statement,[filename,mimetype,filesize,userID,momentID])
    }
    async getAvatarInfoByUser(userID){
        const statement =  `
        SELECT * FROM users u LEFT JOIN avatar a ON u.current_avatar_id = a.id
        WHERE u.id = ?
        `
        return await connection.poolPromise.execute(statement,[userID])
    }
    async getAvatarsInfoByUser(userID){
        const statement =  `
        SELECT u.id,u.username,JSON_ARRAYAGG(CONCAT('http://localhost:8080/users/avatars/',a.id)) avatar_urls 
        FROM users u
        LEFT JOIN avatar a 
        ON u.id = a.user_id
        WHERE u.id  = ?
        GROUP BY u.id
        `
        return await connection.poolPromise.execute(statement,[userID])
    }
    async getAvatarsDetails(avatarID){
        const statemet = `
        SELECT * FROM avatar WHERE id = ?
        `
        return await connection.poolPromise.execute(statemet,[avatarID]);
    } 
    async getFileDetailsByFilename(filename){
        const statement = `
        SELECT * FROM file WHERE filename = ?
        `
        return await connection.poolPromise.execute(statement,[filename]);
    }
}
module.exports = new FileServive();