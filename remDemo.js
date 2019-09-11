// js控制字体大小作为参照
const MAX_FONT_SIZE = 42
document.addEventListener('DOMContentLoaded', () => {
	const html = document.querySelector('html')
	let fontSize = window.innerWidth / 10
	// 设置最大值
	fontSize > MAX_FONT_SIZE && fontSize = MAX_FONT_SIZE
	// 设置字体大小确定rem使用
	html.style.fontSize = fontSize
})

// scss进行px2rem
$rootFontSize: 375 / 10
@function px2rem ($px) {
	@return $px / $rootFontSize + rem
} 