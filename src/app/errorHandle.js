const errorTypes = require('../constants/errorTypes')
const errorHandler = (err,ctx) => {
    let status, message;
    // console.log( err.message  === errorTypes.USERNAME_OR_PASSWORD_CAN_NOT_BE_EMPTY);
    switch (err.message) {
        case errorTypes.USERNAME_OR_PASSWORD_CAN_NOT_BE_EMPTY:
            status = 400
            message = "IS_EMPTY"
            break;
        case errorTypes.USERNAME_IS_EXISTS:
            status = 409
            message = "USER_IS_EXISTS"
            break;
        case errorTypes.USERNAME_DOES_NOT_EXISTS:
            status = 400
            message = "USER_DOES_NOT_EXISTS"
            break;
        case errorTypes.PASSWORD_ERROR:
            status = 400
            message = "PASSWORD_ERROR"
            break;
        case errorTypes.UNAUTHORIZED:
            status = 401
            message = "INVALID_TOKEN"
            break;
        case errorTypes.AUTHORIZEDEXPIRED:
            status = 401
            message = "EXPIRED_TOKEN"
            break;
        case errorTypes.MOMENTIDGTMAX:
            status = 404
            message = "MOMENTID_NOT_FOUND"
            break;
        case errorTypes.USERIDGTMAX:
            status = 404
            message = "USERID_NOT_FOUND"
            break;
        case errorTypes.UNPERMISSION:
            status = 401
            message = "UNPERMISSION";
            break;
        default:
            status = 404
            message = "NOT_FOUND";
    }
    ctx.status = status;
    ctx.body = message;
}
module.exports = {
    errorHandler
}