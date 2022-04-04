const commentService = require('../service/comment.service')
class CommentController {
    async create(ctx, next) {
        let { momentID } = ctx.params;
        let { id } = ctx.userInfo;
        let { content } = ctx.request.body;
        // console.log( content,momentID,id );
        try {
            let [reslut] = await commentService.create(content, momentID, id);
            ctx.body = reslut;
        } catch (err) {
            console.log(err);
        }
    }
    async reply(ctx, next) {
        let { commentID } = ctx.params;
        let { id } = ctx.userInfo;
        let { content, momentID } = ctx.request.body;
        console.log( commentID,id,content,momentID );
        try {
            let [reslut] = await commentService.reply(content, momentID, id, commentID);
            ctx.body = reslut;
        } catch (err) {
            console.log(err);
        }
    }
    async update(ctx,next) {
        let { commentID } = ctx.params;
        let { content } = ctx.request.body;
        try {
            let all = await commentService.update(content, commentID);
            console.log(all);
            let [reslut] = await commentService.update(content, commentID);
            ctx.body = reslut;
        } catch (err) {
            console.log(err);
        }
    }
    async remove(ctx,next) {
        let { commentID } = ctx.params;
        try {

            let all = await commentService.remove(commentID);
            console.log(all);
            let [reslut] = await commentService.remove(commentID);
            // ctx.body = reslut;
            ctx.body = 'done';
        } catch (err) {
            console.log(err);
        }
    }
    async getCommentBymomentID(ctx,next) {
        let { momentID } = ctx.params;
        try {
            // let reslut = await commentService.getCommentBymomentID(momentID)
            let [reslut] = await commentService.getCommentBymomentID(momentID)
            // console.log(reslut);
            // ctx.body = reslut[0];
            ctx.body = reslut;
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = new CommentController();