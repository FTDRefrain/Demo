import { createStore } from 'react-redux'

import mainReducer from './reducer/main.js'

const store = createStore(mainReducer)

// 实现热加载store
if(module.hot) {
    module.hot.accept('./reducer/main.js',()=>{
        const nextRootReducer = require('./reducer/main.js').default
        store.replaceReducer = nextRootReducer
    })
}

export default store