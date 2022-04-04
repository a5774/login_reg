// Promise path No change
// console.log( process.cwd(),__dirname);
const Router = require('koa-router');
const fileRouter = new Router({prefix:'/upload'})
const {verifyToken} = require('../middleWare/auth.verify')
const { avatarhandler,picturehandler,pictureRsize} = require('../middleWare/file.middleWare')
const { saveAvatarInfo,savePictureInfo } = require('../controller/file.Controller')

// fileRouter.get
// user upload avatar ,save info to database bind user_avatar
fileRouter.post('/avatar',verifyToken,avatarhandler,saveAvatarInfo);
// query:?momentID=?,user upload file
fileRouter.post('/file/picture',verifyToken,picturehandler,pictureRsize,savePictureInfo)



module.exports = fileRouter;