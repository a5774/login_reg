const Koa = require('koa')
const fs = require('fs');
const multer = require('koa-multer')
const body = require('koa-bodyparser')
const Router = require('koa-router');
let router = new Router({prefix:"/any"});
let app = new Koa();
let files = multer({
    dest:"./file"
})
router.post('/',body({
    // default [json,form]
    // allow  parser format
    enableTypes:['json','form','text','xml'],
    // onerror:
}),files.single('file'),(ctx,next)=>{
    // can parser url-encode
    console.log(ctx.request.body);
    // can parser form-data
    console.log( ctx.req.file );
    ctx.body = "done"
})
router.get('/form',(ctx)=>{
    ctx.type = 'text/html'
    ctx.body = fs.createReadStream('./form.html');
})
app.use(router.routes());

app.listen(8080,()=>{
    console.log("start_port:8080");
})
