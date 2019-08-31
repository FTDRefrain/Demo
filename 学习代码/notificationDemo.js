const notice = new Notification("前端宇宙情报局", {
  body: "这20个不常用的Web API真的有用吗?，别问，问就是有用🈶",
  icon: "我的掘金头像",
  data: {
    url: "https://www.baidu.com"
  }
});

// 点击回调
notice.onclick = () => {
  window.open(notice.data.url); // 当用户点击通知时，在浏览器打开百度网站
}

let permission = Notification.permission

Notification.requestPermission((res)=>{
	res === 'granted'
	res === 'denied'
})

if(permission === 'granted') {
	// 发送通知
} else if(permission === 'denied') {
	// 不发送
} else {
	// 申请授权
	Notification.requestPermission()
}