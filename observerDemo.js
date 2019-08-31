// IntersectionObserver应用
// img lazy loader
// 优势是对于窗口监听，这样横向也能懒加载
const images = document.querySelectorAll("img.lazyload");

const observer = new IntersectionObserver(entries => {
  entries.forEach(item => {
    if (item.isIntersecting) {
      item.target.src = item.target.dataset.origin; // 开始加载图片
      observer.unobserve(item.target); // 停止监听已开始加载的图片
    }
  });
});

images.forEach(item => observer.observe(item));

// 触底
// dom 如下
<ul><li></li></ul>
<div class="reference"></div>
new IntersectionObserver(enter => {
	// 目标是找到最下面的div
	if(enter.isIntersecting){
		log('loading time')
	}
}).observe(document.querySelector('.reference'))

// 吸顶
<div class="reference"></div>
<ul class=".nav"><li></li></ul>

const refer = document.querySelector('.reference')
const nav = document.querySelector('.nav')
// 避免nav脱离文档带来的影响
refer.style.top = nav.offset.top

.nav .fixed {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%
}

new IntersectionObserver(enter => {
	const top = enter.boundingClientRect.top
	top <= 0 ? nav.classList.add('fixed') : nav.classList.remove('fixed')
}).observe(refer)

// 可视则添加动画
<ul><li></li></ul>
ul li .show {
	animation: left 1s ease;
}
ul li .show:nth-child(2n) {
	animation: right 1s ease;
}
@keyframe left {
	from {
		opacity: 0;
		transform: translate(-20px, 20px)
	}
	to {
		opacity: 1;
	}
}

const items = document.querySelectorAll('ul li')
const observer = new IntersectionObserver(entries => {
	entries.foreach(item => {
		if(item.isIntersecting){
			item.classList.add('.show')
			observer.unobserve(item)
		}
	})
})
items.foreach(i => observer.observe(i))