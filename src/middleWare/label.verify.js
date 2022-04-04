const labelService = require('../service/label.service');
class LabelVerify{ 
    // add label  
    async verifyExistLabels(ctx,next){
        let { labels } = ctx.request.body;
        // Promise need use for await of
        const labelViem = [];
        for (const name of labels) {
            const [labelReslut] = await labelService.hasExistLabel(name);
            const label = {name};
            // console.log( label );
            // if not exists then create label and bind id 
            if(!labelReslut.toString()){
                const [reslutSetHeader] = await labelService.create(name);
                Reflect.set(label,'id',reslutSetHeader['insertId']);
            }else{
                // other bind id push labelViem
                Reflect.set(label,'id',labelReslut[0]['id'])
            }
            labelViem.push(label);
        }
        // console.log( labelViem);
        ctx.labels = labelViem;
        await next();
    }
}
module.exports = new LabelVerify()