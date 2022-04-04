const labelService = require('../service/label.service')
class LabelController{
    async create(ctx,next){
        let {label} = ctx.request.body;
        const [isExist] = await labelService.hasExistLabel(label);
        if (!isExist.toString()){
            await labelService.create(label);
            ctx.body = "done"
        }
        ctx.body = "isExist"
    }
    async sucess(ctx,next){
        ctx.body = ctx.labels;
    }
    async list(ctx,next){
        let { offset,size } = ctx.query;
        const [reslut] = await labelService.list(offset,size)
        ctx.body = reslut;
    }
    
   

}
module.exports = new LabelController();