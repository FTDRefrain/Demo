export function applyMiddleware(...middlewares) {
	// 里面的next是createStore
	return (next) => (reducer, initialState) => {

		let store = next(reducer, initialState)
		let dispatch = store.dispatch
		let chain = []

		const middlewareAPI = {
			// 将store封装进去
			dispatch: (action) => dispatch(action),
			getState: store.getState,
		}
		chain = middlewares.map(middleware => middleware(middlewareAPI))
		dispatch  = compose(...chain)(store.dispatch)

		return {
			...store,
			dispatch
		}
	}
}

const compose = (...funs) => (...args) => funcs.reduceRight((composed, f)=>f(composed, args))

// in use
let store = applyMiddleware(mid1, mid2, mid3)(createStore)(reducer, null)

// thunk
// 返回包住的函数这样就是异步的了，因为函数可以异步调用
// 所有的中间件都可以这么写
function createThunkMiddleware(...args) {
	return ({dispatch, getState}) => next => action => {
		if(typeof action === 'function') {
			return action(dispatch, getState, args)
		}
		return next(action)
	}
}
// 轮询的例子
const setCheck = ({dispatch, getState}) => next => action => {
	// 没有或者参数不对则直接进入下一层
	const {pollingUrl, params, types} = action
	const isPollingAction = pollingUrl && params && types
	if(!isPollingAction){
		return next(action)
	}
	// 正常操作
	const startPolling = (timeout = 0) => {
		timer = setTimeout(()=>{
			const { pollingUrl, ...others } = action
			const pollData = {
				...others,
				url: pollingUrl,
				timer
			}
			dispatch(pollData).then((data)=>{
				if(data && data.internal){
					startPolling(data.internal)
				} else {
					console.log(data.error)
				}
			})
		}, timeout)
	}
	// 开始轮询
	startPolling()
}
// 调用方式
const action = {
	pollingUrl: '123', 
	params:{
		city: encodeURI(city)
	}, 
	types:[null, 'GET_SUCCESS']
}
dispatch(action)

// 多异步串联
const multiAsync = ({dispatch, getState}) => next => action => {
  // 使用then和Promise.resolve去串联
  return action.reduce((result, currentAction)=>{
    result.then(()=>{
      return Array.isArray(currentAction) ? Promise.all(currentAction.map(i => dispatch(i)) : dispatch(currentAction)
    })
  }, Promise.resolve())
}