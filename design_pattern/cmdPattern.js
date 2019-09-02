// 命令模式
// 绑定命令
const setCmd = (dom, fn) => {
	dom.onclick = (e) => {
		// 提前修饰
		doSomething()
		fn()
	}
}
// 设定执行的cmd
const refreshWrapper = (receiver) => {
	return {
		execute: () => {
			receiver.fresh()
		}
	}
}
// 命令合集
const MenuBar = {
	fresh: () => log('refresh')
}
// 绑定cmd
setCmd(target, refreshWrapper(MenuBar).execute)


// 消息队列构建方式，能reply
const log = console.log.bind()
const ryu = {
	attack: function(){
		log('attack')
	},
	defense: function(){
		log('defense')
	},
	jump: function(){
		log('jump')
	},
	crouch: function(){
		log('crouch')
	},
}

const code2Cmd = {
	'119':'attack',
	'115':'defense',
	'97':'jump',
	'100':'crouch'
}

const makeCmd = function(receiver, state) {
	return () => receiver[state]()
}

let replyList = []

dom.onkeypress = (e) => {
	const code = e.keycode
	const cmd = makeCmd(ryu, code2Cmd[code])
	if(cmd) {
		cmd()
		replyList.push(cmd)
	}
}

dom.onClick = () => {
	// 依次执行后清空
	replyList.foreach(cb => cb())
	replyList = []
}