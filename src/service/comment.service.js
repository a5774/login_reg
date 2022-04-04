const connection = require('../app/database')
class CommentService {
    async create(content, momentID, userID) {
        const statement = `
        INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?) 
        `
        return await connection.poolPromise.execute(statement, [content, momentID, userID]);
    }
    async reply(content, momentID, userID, commentID) {
        const statement = `
        INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?) ;
        `
        return await connection.poolPromise.execute(statement, [content, momentID, userID, commentID]);
    }
    async update(content, commentID) {
        const statement = `
        UPDATE comment SET content = ? WHERE id = ? ;
        `
        return await connection.poolPromise.execute(statement, [content, commentID])
    }
    async remove(commentID) {
        const statement = `
        DELETE FROM comment WHERE id = ?;
        `
        return await connection.poolPromise.execute(statement, [commentID]);
    }
    async getCommentBymomentID(momentID) {
        const statement = `
	    SELECT m.id,m.content,m.createAt,JSON_ARRAYAGG(JSON_OBJECT('id',c.id,'content',c.content,'user',JSON_OBJECT('id',u.id,'username',u.username))) comments FROM comment c LEFT JOIN moment m  
		ON c.moment_id= m.id 
	    LEFT JOIN users u 
		ON u.id = c.user_id
        WHERE m.id = ?
		GROUP BY m.id    
        `
        return await connection.poolPromise.execute(statement, [momentID])
    }
}
module.exports = new CommentService();