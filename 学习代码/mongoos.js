const mongoose = require('mongoose')
// 全局变量设置
mongoose.Promise = Promise
// 开启debug模式
mongoose.set('debug',true)
// 链接数据库
mongoose.connect('mongodb://localhost/xxo',{
	useMonggoClient:true
})
// 启动时候调用函数
mongoose.connection.on('open',()=>{
	console.log('start')
})
// 构建模型
const UserSchema = new mongoose.Schema({
	name:String,
	times:{
		type:Number,
		default:0
	}
})
// 设定模型
mongoose.model('User', UserSchema)
// 中间件
UserSchema.pre('save', function(next){
	// 不用箭头，this指向不对
	this.time++
	next()
})
// 静态自定义方法
UserSchema.static = {
	async getUser(name) {
		// this指向当前的模型
		const user = this.findOne({
			name:name
		}).exec()

		return user
	}
}
// 模型方法添加
UserSchema.methods = {
	async fetchUser(name) {
		const user = await this.model('User').findOne({
			name:name
		}).exec()
		return user
	}
}
// 声明
const User = mongoose.model('User')
// 执行语句
(async ()=>{
	console.log(await User.find({}).exec())
	// 使用自定义方法
	console.log(await User.getUser('vue')
	// 使用模型方法
	const userModel = await User.findOne({
		name:'vue'
	}).exec()
	const newUser = await userModel.fetchUser('vue')



	const userFirst = new User({
		name:'vue'
	})
	await userFirst.save()


	const userSecond = User.findOne({name:'vue'}).exec()
	userSecond.name = 'vue ssr'
	await userSecond.save()
})()