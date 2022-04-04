const connection = require('../app/database')
class labelService{
    async create(labelName){
        const statement = `
        INSERT INTO labels (name) VALUES (?)
        `
        return await connection.poolPromise.execute(statement,[labelName])
    }
    // check label is exists
    async hasExistLabel(labelName){
        const  statement = `
        SELECT * FROM labels WHERE name = ? ;
        `   
        return await connection.poolPromise.execute(statement,[labelName])
    }
    async list(offset,size){
        const statement = `
        SELECT id ,name,createAt,updateAt FROM labels LIMIT ?,?
        `
        return await connection.poolPromise.execute(statement,[offset,size]);
    }
}
module.exports = new labelService()