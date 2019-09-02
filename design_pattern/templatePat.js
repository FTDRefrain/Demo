// 模板方法模式

const Beverage = (params) => {
	const boilwater = params.boilwater || () => throw new Error()
	const brew = params.brew || () => throw new Error()
	const pourIncup = params.pourIncup || () => throw new Error()
	const addCondiments = params.addCondiments || () => throw new Error()
	const lifeTime = params.lifeTime
	
	const run = Object.create(null)
	run.init = () => {
		boilwater()
		brew()
		pourIncup()
		// hook进行变化分离
		if(lifeTime && lifeTime()) {
			addCondiments()
		}
	}
	return run
}

const Coffee = Beverage({
	boilwater:() => log('boilwater coffee'),
	brew:() => log('brew coffee'),
	pourIncup:() => log('pourIncup coffee'),
	addCondiments:() => log('addCondiments coffee'),
})

const Tea = Beverage({
	boilwater:() => log('boilwater Tea'),
	brew:() => log('brew Tea'),
	pourIncup:() => log('pourIncup Tea'),
	addCondiments:() => log('addCondiments Tea'),
	lifeTime: () => log('add time')
})

const coffee = new Coffee()
coffee.init()