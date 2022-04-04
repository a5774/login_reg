const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
class AuthController{
    async login(ctx,next){
        let pyload = ctx.userInfo; 
        // console.log( pyload );
        // login release token
        let token = jwt.sign(pyload,PRIVATE_KEY,{
            // expiresIn:Date.now(),
            expiresIn:Date.now(),
            // notBefore:Date.now()
            algorithm:'RS256',
            
        })
        ctx.body = {token}
        console.log( ctx.body );
    }    
    async sucess(ctx,next){
        ctx.body = ctx.userInfo;
    }
}
module.exports = new AuthController();