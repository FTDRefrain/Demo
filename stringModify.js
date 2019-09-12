const log = console.log.bind()
// 模板引擎
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
function render(tpl, data){
	// x表示匹配到的，$1表示的是括号里面的
	return tpl.replace(/\{\{(\w+)\}\}/g, function(x, $1){
		return data[$1]
	})
}
// 驼峰装换
let s1 = "get-element-by-id"
function upperDemo(s1) {
	// 一样的道理
	return s1.replace(/-\w/g, function(x){
		return x.slice(1).toUpperCase()
	})
}

function isPhone(tel) {
    var regx = /^1[34578]\d{9}$/;
    return regx.test(tel);
}

function isEmail(email) {
    var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
    return regx.test(email);
}

function isCardNo(number) {
    var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return regx.test(number);
}
