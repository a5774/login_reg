const Koa = require('koa')
const Router = require('koa-router')
const multer = require('koa-multer')
let app = new Koa();
let router = new Router()
let upload = multer({
    dest:'./file'
})
router.post('/',upload.any(),(ctx,next)=>{
    console.log( ctx.req.body );
})
app.use(router.routes())
app.listen(8080,()=>{
    console.log( "port:8080");
})



