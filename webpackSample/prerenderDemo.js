// config.js
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new PrerenderSPAPlugin({
            staticDir: resolve('dist'),
            routes: ['/', '/about'], // 你需要预渲染的路由
            renderer: new Renderer({
              inject: {
                _m: 'prerender'
              },
              // 渲染时显示浏览器窗口，调试时有用
              headless: true,
              // 等待触发目标时间后，开始预渲染
              renderAfterDocumentEvent: 'render-event'
            })
          })
        ]
      }
    }
  }
}

// main.js, vue的例子, react同样道理
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  // 这里外面包住一层
  render: h => h(App),
  mounted () {
    // 触发renderAfterDocumentEvent
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')