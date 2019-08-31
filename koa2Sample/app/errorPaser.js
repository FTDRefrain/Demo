const catchErro = async (ctx, next) => {
  try{
    await next()
  } catch(e){
    if(e instanceof HttpException) {
      ctx.body = {
        msg: e.msg,
        errorCode: e.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = e.code
    } else {
      ctx.body = {
        msg:'my error msg',
        errorCode: 500,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  }
}


// 全局挂载方法
const errorClass = require('../errorClass')
global.errors = errorClass
const errorInstance = new global.errors()