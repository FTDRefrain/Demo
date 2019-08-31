const router = require('koa-router')

router.get('/', (ctx, next)=>{
	ctx.body = 'good'
})

module.exports = router