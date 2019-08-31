var koa2 = require('koa2')
var app = koa2()

asyncIo = () => {
	return new Promise((resolve) => {
		setTimeOut((resolve) =>{
			console.log('resolve')
		}, 500)
	})
}

var mid = async (ctx,next) => {
	ctx.body = 'start'
	await next()
	ctx.body += 'done'
}

app.use(mid)
app.use(async(ctx, next) => {
	await asyncIo()
	ctx.body += 'mid1'
	next()
})

app.listen(3000)