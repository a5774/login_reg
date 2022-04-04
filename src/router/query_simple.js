const Router = require('koa-router');
const path = require('path')
const fs = require('fs');
const { request } = require('http');
const testRouter = new Router({prefix:"/test"})
testRouter.get("/", async (ctx,next)=>{
    // set content-Disposition : filename
    // ctx.attachment('admin',{});
    // sync 
//    ctx.body += fs.readFileSync('./.env');
    ctx.type = "image/jpeg"
    // get callback parmas 
    let data  = await new Promise((res,rej)=>{
        fs.readFile('./uploads/file/0v6fxtv1s.jpg',(err,data)=>{
            // can not execute callbak
            res(data);
        })
    })
    ctx.body = data 
})
testRouter.get('/redirect/:key',(ctx,next)=>{
    // cancel koa recevier Response
  // ctx.respond = false
    console.log( ctx.request.header == ctx.headers);//true
  console.log( ctx.url);
//   only read 
  console.log( ctx.origin );//protocol 和 host。
//   set url 
  console.log( ctx.originalUrl);//request url 
//    console.log(ctx.headers['content-type']);//multipart/form-data; boundary=--------------------------864199830661023797625201
    // console.log( ctx.params.key);
   ctx.headers.referer = `https://www.baidu.com/s?wd=${ctx.params.key}`
   console.log(  ctx.get("referer"));
//    'back' = request.headers.Referrer
    // if  url is not exists then use alt or '/'
    // url ,[alt]
    ctx.status = 202;
    ctx.redirect('back',);

})
module.exports = testRouter;
