// 组合模式
// 相似的子模式通过
const log = console.log.bind()

const open1 = {
	// 这里的execute方法是为了之后改装成macro
	execute:() => log(1)
}
const open2 = {
	execute:() => log(2)
}
const open3 = {
	execute:() => log(3)
}
const open4 = {
	execute:() => log(4)
}

const macro = () => {
	return {
		cmdList: []
		add: (fn) => {
			this.cmdList.add(fn)
		},
		execute: () => {
			this.cmdList.foreach(fn => fn.execute())
		}
	}
}
const m = macro()
m.add(open1)
m.add(open2)
m.add(open3)
m.add(open4)
m.execute()