const Koa = require('koa');
const static = require('koa-static')
// const userRouter = require('../router/user.Router')
// const authRouter = require('../router/auth.Router')

const useRoutes = require('../router/index')
const { errorHandler } = require('../app/errorHandle')
let app = new Koa(/* optins */);

//  ctx.set('Allow', allowedArr) | header.body


// app.use(authRouter.routes())
// app.use(authRouter.allowedMethods())
Reflect.set(app,'useRoutes',useRoutes)


// cors handler 
/* app.use(async (ctx,next)=>{
    console.log( "cors");
    console.log( ctx.header);
    ctx.set("Access-Control-Expose-Headers",["*",""])
    // next() return Promise need await get middlerWare functicon
    await next();
}) */

// console.log( app);
app.useRoutes();
// Error listening
app.addListener("error",errorHandler)

module.exports = app;
