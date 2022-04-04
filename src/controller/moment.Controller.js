const fs = require('fs');
const fileService = require('../service/file.service');
const momentService = require('../service/moment.service')
const { FILE_PATH } = require('../constants/filePath')
class MomoentController {
    async create(ctx, next) {
        let { id } = ctx.userInfo;
        let { content } = ctx.request.body;
        let [reslut] = await momentService.create(id, content);
        // console.log(reslut);
        ctx.body = reslut;
    }
    async momentDetails(ctx, next) {
        let { momentID } = ctx.params;
        try {
            // console.log( NaN.toString());  
            let [reslut] = await momentService.getMomentByID(momentID)
            // console.log( reslut );
            ctx.body = reslut;
        } catch (err) {
            console.log(err);
        }
    }
    async momentDetailsByUserID(ctx, next) {
        let { userID } = ctx.params;
        // JSON_OBJECT()
        let [reslut] = await momentService.getMomentByUserID(userID)
        ctx.body = reslut;
    }
    async list(ctx, next) {
        // limit offset ,size 
        let { offset, size } = ctx.query;
        // console.log( offset ,size );
        let [reslut] = await momentService.getMomentList(offset, size);
        ctx.body = reslut;
    }
    async update(ctx, next) {
        let { momentID } = ctx.params;
        // json content 
        let { content } = ctx.request.body;
        let [reslut] = await momentService.update(momentID, content);
        ctx.body = reslut;
    }
    async remove(ctx, next) {
        let { momentID } = ctx.params;
        // ResultSetHeader
        let [reslut] = await momentService.remove(momentID);
        // console.log(reslut);
        ctx.body = reslut;
    }
    /*    async updateREL(ctx,next){
           let { seqID } = ctx.params;
           let { id } = ctx.userInfo;
           let { content } = ctx.request.body;
           let MID = await momentService.getAllUserMoment(id,seqID);
           console.log(MID);
           let [reslut]  = await momentService.update(momentID,content);
           ctx.body = reslut ;
       } */
    //    add label for moment
    async additionLabels(ctx, next) {
        let { labels } = ctx;
        let { momentID } = ctx.params;
        for (const label of labels) {
            try {
                // if moment is not relation with label then addittion 
                const [isExist] = await momentService.hasLabelMoment(momentID, label['id'])
                if (!isExist.toString()) {
                    await momentService.additionLabels(momentID, label['id'])
                }
            } catch (err) {
                console.log(err);
            }
        }
        ctx.body = "done"
    }
    // fileDetails 
    async fileDetails(ctx, next) {
        try{
        let { filename } = ctx.params;
        const { type } = ctx.query;
        const types = ['large', 'middle', 'small'];
        //get fileinfo 
        const [reslut] = await fileService.getFileDetailsByFilename(filename);
        const [{ mimetype }] = reslut;
        // simple if statement 
        if (types.some(item =>{ return item == type})) {
            // restructure filename for type 
            filename = `${filename}-${type}`;
        }
        ctx.response.type = mimetype;
        // match file for fileanme to local 
        ctx.body = fs.createReadStream(`${FILE_PATH}/${filename}`, {
            highWaterMark: 64 * 1024,
            // if fd is exists then pathLike will invalid
            // fd:
        });
        }catch(err){
            console.log( err );
        }
    }

}
module.exports = new MomoentController()