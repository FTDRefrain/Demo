// 中介者模式 - 表单选择时候
// 游戏例子
const log = console.log.bind()
let playerDirector

const DIE = 'die'
const ALIVE = 'alive'
// player class
function Player(name, teamColor) {
	this.name = name
	this.teamColor = teamColor
	this.state = ALIVE
}
Player.prototype.win = function() {
	log(`${this.name} win`)
}
Player.prototype.defeat = function() {
	log(`${this.name} defeat`)
}
Player.prototype.die = function() {
	this.state = 'die'
	playerDirector.ReceiveMessage('playerDie', this)
}
Player.prototype.remove = function() {
	playerDirector.ReceiveMessage('removePlayer', this)
}
Player.prototype.changeTeam = function(color) {
	playerDirector.ReceiveMessage('changeColor', this, color)
}
// 工厂模式创建
const playerFactory = function(name, teamPlayer) {
	const newPlayer = new Player(name, teamPlayer)
	playerDirector.ReceiveMessage('addPlayer', newPlayer)
	return newPlayer
}
// 中介者
playerDirector = (function(){
	let players = {}
	let options = {}
	// 添加
	options.addPlayer = function(newPlayer) {
		const color = newPlayer.teamColor
		if(players[color] === void 0){
			players[color] = []
		}
		players[color].push(newPlayer)
	}
	// 玩家死亡后通报
	options.playerDie = function(player) {
		const teamColor = player.teamColor
		const teamPlayers = players[teamColor]
		let allState = DIE
		for(let i=0;i<teamPlayers.length;i++){
			if(teamPlayers[i].state === ALIVE) {
				return
			}
		}
		teamPlayers.foreach(p => p.defeat())
		for(color in players){
			if(color !== teamColor) {
				players[color].foreach(p => p.win())
			}
		}
	}
	// 移除玩家
	options.removePlayer = function(player) {
		const teamColor = player.teamColor
		const teamPlayers = players[teamColor]
		teamPlayers.foreach((p, i) => {
			if(p === player) {
				teamPlayers.splice(i, 1)
			}
		})
	}
	options.changeTeam = function(player, color) {
		options.removePlayer(player)
		player.teamColor = color
		options.addPlayer(player)
	}
	// 调用目标函数
	const ReceiveMessage = function() {
		const option = Array.prototype.shift.call(arguments)
		options[option].apply(this, arguments)
	}

	return ReceiveMessage
})()