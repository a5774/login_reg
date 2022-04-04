const path = require('path');
const multer = require('koa-multer');
const sharp = require('sharp');
const { AVATAR_PATH,FILE_PATH} = require('../constants/filePath');
const { nextTick } = require('process');
const MAX = 4; 
let Storage = multer.diskStorage({
    destination:(err,file,callback)=>{
        // path select ,
        if(file.fieldname === 'avatar'){
        callback(null,path.resolve(AVATAR_PATH));
        }
        if(file.fieldname === 'picture'){
            // console.log( file.fieldname)
        callback(null,path.resolve(FILE_PATH));
        }
    },
    filename:(err,file,callback)=>{
        // console.log( file.originalname);
        // console.log( path.extname(file.originalname));
        // console.log( file.fieldname);
        callback(null,`${Math.random().toString(36).slice(3)}${path.extname(file.originalname)}`)
    }
})
let upload = multer({
    // dont create dir 
    storage:Storage
    // create dir 
    // dest:AVATAR_PATH
})
class FileHandler{ 
    // add to instanceof FileHandler attribute 
    // single
    avatarhandler = upload.single('avatar')
    // Multiple
    picturehandler = upload.array('picture',MAX)
    // Rsize Pictures
    async pictureRsize(ctx,next){
        const files = ctx.req.files;
        for (const file of files) {
            const SrcPath = path.resolve(`${FILE_PATH}/${file.filename}`)
            // create Rsize 
            // sharp extends Duplex
            sharp(SrcPath)
            // return sharp.Sharp
            .resize(1280).toFile(`H${FILE_PAT}/${file.filename}-large`,(err,info)=>{
                console.log( info );
            }) 
            .resize(640).toFile(`${FILE_PATH}/${file.filename}-middle`,(err,info)=>{
                // console.log( info);
            })
            .resize(320).toFile(`${FILE_PATH}/${file.filename}-small`,(err,info)=>{
                // console.log( info );
            })
        }
        await next();    
    }
}


module.exports = new FileHandler()