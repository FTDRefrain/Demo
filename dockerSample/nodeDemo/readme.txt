node服务器端的docker配置
和静态的一样，没有了npm build但是要换成npm install安装依赖

这里node服务启动的时候
将pm2 start app.js
变成pm2-docker app.js