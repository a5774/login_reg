const cryto = require('crypto')
const encryption = (password)=>{
    const md5 = cryto.createHash('md5');
    return md5.update(password).digest('base64')
}
module.exports = {
    encryption
}

