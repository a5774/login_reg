// enter 
const app = require('./app/index');
const { TEST_PORT } = require('./app/config')
// console.log( process.cwd(),__dirname);
app.listen(TEST_PORT,'localhost',()=>{console.log(`port:${TEST_PORT} Listening`)})