const fs = require('fs')
const Router = require('koa-router');
const parser = require('koa-bodyparser')
const { verifyUser,Encryption } = require('../middleWare/user.verify')
const { create,avatarDetails,avatarInfoList,modifyAvatar,AvatarsDetails} = require('../controller/user.Controller');
const { verifyToken,verifyPermission} = require('../middleWare/auth.verify');
const userRouter = new Router({prefix:'/users'})

// create user JSON{username,pasword }
userRouter.post("/",parser(),verifyUser,Encryption,create)
// get user avatarDetails 
userRouter.get('/:userID/avatar',avatarDetails);
// get logged in  user avatarInfos list 
userRouter.get('/avatars',verifyToken,avatarInfoList)
// get user avatars details 
userRouter.get('/avatars/:avatarID',verifyToken,verifyPermission,AvatarsDetails);
// change avatar for user
userRouter.patch('/:avatarID/avatar',verifyToken,verifyPermission,modifyAvatar)

userRouter.get('/token',(ctx)=>{
    ctx.type = "text/html"
    ctx.body = fs.createReadStream('./form/token.html');
})
// remove 
module.exports = userRouter