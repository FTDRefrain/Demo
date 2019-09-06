const {resolve} = require('path')
const r = url => resolve(__dirname, url)

module.exports = {
    "json": {
        "style": {
            url: r('./style/base.sass'),
            lang: 'sass'
        },
        "app": r('./app.js'),
        "pages": [
            "pages/index/index",
            "pages/logs/logs"
        ],
        "window": {
            "navigationBarTextStyle": "black",
            "navigationBarTitleText": "演示",
            "navigationBarBackgroundColor": "#F8F8F8",
            "backgroundColor": "#F8F8F8"
        },
    }
}