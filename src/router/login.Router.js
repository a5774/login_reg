const Router = require('koa-router');
const parser = require('koa-bodyparser')
const authRouter = new Router({prefix:'/login'});
const { login,sucess } = require('../controller/auth.Controller')
const { verifyLogin,verifyToken } = require('../middleWare/auth.verify')

// JOSN{ username,password }
authRouter.post('/',parser(),verifyLogin,login);
// test 
authRouter.get('/token',parser(),verifyToken,sucess)
module.exports = authRouter;

