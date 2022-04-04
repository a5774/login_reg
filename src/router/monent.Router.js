const Router = require('koa-router');
const parser = require('koa-bodyparser');
const { create,momentDetails,momentDetailsByUserID,list,update,remove,additionLabels,fileDetails} = require('../controller/moment.Controller')
const { verifyToken } = require('../middleWare/auth.verify');
const { /* maxMomentID,maxUserID ,*/verifyPermission} = require('../middleWare/auth.verify');
const { verifyExistLabels } = require('../middleWare/label.verify')
const momentRouter = new Router({prefix:'/moment'})
// add moemnt 
// check login token { content } 
momentRouter.post('/',parser(),verifyToken,create);
// get moment 
// any allow visit,  check params  
momentRouter.get('/details/:momentID',momentDetails);
// visit user all monent 
momentRouter.get('/user/:userID',momentDetailsByUserID)
//query , all moment list query: offset= ? & limit = ?
momentRouter.get('/list',list);
// update moment { content  }
// check login token , check permission,update
// momentRouter.patch('/update/:momentID',parser(),verifyToken,verifyPermission('moment'),update);
momentRouter.patch('/:momentID',parser(),verifyToken,verifyPermission,update);
// relative
// momentRouter.patch('/updateREl/:seqID',parser(),verifyToken,updateREL)
// delete moment 
momentRouter.delete('/:momentID',verifyToken,verifyPermission,remove)
// add labels for moment 
momentRouter.post('/:momentID/labels',parser(),verifyToken,verifyPermission,verifyExistLabels,additionLabels)
//query, puclic request, add picture for moment 
momentRouter.get('/images/:filename',fileDetails);



module.exports = momentRouter;
