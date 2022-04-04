const mysql = require('mysql2');
const config = require('./config')
// 连接池
let pool = mysql.createPool({
    host:config.SQL_HOST,
    port:config.SQL_PORT,
    database:config.SQL_DATABASE,
    user:config.SQL_USER,
    password:config.SQL_PASSWORD,
    connectionLimit:100,
    waitForConnections:true,
    queueLimit:5,
    // acquireTimeout:3000
})
let poolPromise = pool.promise();
// test Connection
/* pool.getConnection((err,conn)=>{
    if(err) throw err;
    console.log("connection Start");
    // conn.execute()
    // pool.releaseConnection(conn);
})
 */

/* pool.query('SELECT * from users ;',(err,res,field)=>{
    console.log( res);
}) */

module.exports = {
    pool,
    poolPromise
}

