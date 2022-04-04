const Router = require('koa-router');
const parser = require('koa-bodyparser');
const commentRouter = new Router({ prefix:'/comment'});
const { verifyToken } = require('../middleWare/auth.verify')
const { verifyPermission } = require('../middleWare/auth.verify')
const { create,reply,update,remove,getCommentBymomentID} = require('../controller/comment.Controller');



// create JSON{ content }
commentRouter.post('/:momentID',parser(),verifyToken,create);
// reply {content,momentID }
commentRouter.post('/:commentID/reply',parser(),verifyToken,reply)
// update,check comment belong to this user { content }
commentRouter.patch('/:commentID',parser(),verifyToken,verifyPermission,update); 
// delete 
commentRouter.delete('/:commentID',verifyToken,verifyPermission,remove);
// get 
commentRouter.get('/:momentID',verifyToken,getCommentBymomentID)






module.exports = commentRouter;