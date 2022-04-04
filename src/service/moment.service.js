const connection = require('../app/database')
class MomentService{
    // insrt moment 
    async create(userId ,content){
        const statement = `INSERT INTO moment (user_id,content) VALUES (?,?)`
        return await connection.poolPromise.execute(statement,[userId,content])
    }
    // get moment by momenmt id 
    async getMomentByID(momentID){  
        const statement= `
        SELECT m.id, m.content,m.user_id,m.createAt,m.updateAt,
	    JSON_OBJECT('id',u.id,'username',u.username,'avatar_url',u.avatar_url) author,
		IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
		(SELECT IF(COUNT(c.id),
		JSON_ARRAYAGG(JSON_OBJECT(
		'id',c.id,'content',c.content,'create',c.createAt,
		'user',JSON_OBJECT('id',cu.id,'username',cu.username,'avatar_url',cu.avatar_url))),NULL)
        FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE c.moment_id = m.id) comments,
		(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8080/moment/images/',f.filename)) FROM file f WHERE f.moment_id = m.id ) file_url
	    FROM moment m  
	    LEFT JOIN users u 
	    ON m.user_id = u.id 
		LEFT JOIN moment_label ml
		ON ml.moment_id = m.id
		LEFT JOIN labels l
		ON ml.label_id = l.id
	    WHERE m.id = ?
        GROUP BY m.id
        `;
        return await connection.poolPromise.execute(statement,[momentID])
    }
    // pendding 
    async getMomentByUserID(userID){
        const statement = `
        SELECT 
		u.id,u.username,u.avatar_url,
        JSON_ARRAYAGG(JSON_OBJECT('id',m.id,'content',m.content,'createAt',m.createAt,'updateAt',m.updateAt)) moments,
		(SELECT IF(COUNT(c.id),
		JSON_ARRAYAGG(JSON_OBJECT(
		'id',c.id,'content',c.content,'create',c.createAt,
		'user',JSON_OBJECT('id',cu.id,'username',cu.username))),NULL)
        FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE c.moment_id = m.id) comments
		FROM moment as m
        LEFT JOIN users as u
        ON u.id = m.user_id
        WHERE u.id = ?
        GROUP BY m.id
        ` 
       try{
        return await connection.poolPromise.execute(statement,[userID])
       }catch(err){
           console.log( err);
       }
    }
    async getMomentList(offset,size){
        const statement = `
        SELECT 
        m.content,u.id,m.createAt,m.updateAt,JSON_OBJECT('id',u.id,'username',u.username) user,
        (SELECT COUNT( c.id ) FROM comment as c WHERE c.moment_id = m.id ) MomentCount,
        (SELECT COUNT( ml.id ) FROM moment_label as ml WHERE ml.moment_id = m.id) LabelCount 
        FROM moment as m  
        LEFT JOIN users as u 
        ON m.user_id = u.id 
        LIMIT ?,?;   
        `
        return await connection.poolPromise.execute(statement,[offset,size])
    }
    async update(momentID,content){
        const statement = `
        UPDATE moment SET content = ? WHERE id = ?
        `
        return await connection.poolPromise.execute(statement,[content,momentID])
    }
    async remove(momentID){
        const statement = `
        DELETE FROM moment WHERE id = ?;
        `
        return await connection.poolPromise.execute(statement,[momentID])
    }
 /*    async getAllUserMoment(userID,seq){
       try{
        console.log( userID,seq);
        const statement = `
        set @i=0;
        SELECT t.id  FROM 
        (SELECT (@i:=@i+1) as seq, content,id FROM moment WHERE userId = 1  ) as t 
        WHERE seq = 2 `
        return await connection.poolPromise.execute(statement,[userID,seq]);
       }catch(err){
           console.log(err );
       }
    } */
    // add label for moemnt
    async additionLabels(monentID,labelID) {
        const statement = ` 
        INSERT INTO moment_label (moment_id,label_id) VALUES (?,? )
        `
        return await connection.poolPromise.execute(statement,[monentID,labelID])
    }
    // check moment has label
    async hasLabelMoment(monentID,labelID){
        const statement = `
        SELECT * FROM moment_label WHERE moment_id = ? and label_id = ?;
        `
        return await connection.poolPromise.execute(statement,[monentID,labelID])
    }
   
}
module.exports = new MomentService()
