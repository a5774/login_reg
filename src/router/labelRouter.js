const Router = require('koa-router');
const parser = require('koa-bodyparser');
const { verifyToken } = require('../middleWare/auth.verify') 
const { create,sucess,list} = require('../controller/label.Controller')
const {verifyExistLabels} = require('../middleWare/label.verify')
const labelRouter = new Router({prefix:"/label"})

// single
labelRouter.post('/single',parser(),verifyToken,create);
// multiple
labelRouter.post('/Multiple',parser(),verifyToken,verifyExistLabels,sucess)
// list 
labelRouter.get('/list',verifyToken,list);
// update,remove,,





module.exports = labelRouter;