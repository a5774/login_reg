const dotenv = require('dotenv');   
const fs = require('fs') ;
const path = require('path')
// Add to process.env  
dotenv.config();
console.log(process.env)
console.log(process.argv)
// 相对于node执行工作路径 process.cwd();
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'./KEYS/private.key'),{encoding:'utf-8',flag:'r+'})
console.log( path.resolve(__dirname,'./KEYS/private.key'));
console.log( process.cwd());
console.log(path.resolve('./'));//cwd
console.log(__dirname);//cwd
// console.log( __dirname);
// console.log(PRIVATE_KEY)
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'./KEYS/public.key'),{encoding:'utf-8',flag:'r+'})
// console.log( process.env.HOST_NAME);
module.exports = {
    TEST_PORT,
    SQl_PROT,
    SQL_HOST,
    SQL_DATABASE,
    SQL_USER,
    SQL_PASSWORD,
    HOST_NAME
} = process.env
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;

