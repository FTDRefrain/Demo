import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/axios'
import { myExtend } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createAxios(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 类里面调用this 要将方法和实例化对象绑定
  const instance = Axios.prototype.request.bind(context)
  // 原型和实例属性都在上面 即暴露出去又无关
  myExtend(instance, context)
  return instance as AxiosStatic
}

const axios = createAxios(defaults)

axios.create = function (config) {
  return createAxios(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
  return Promise.all(promises)
}
// 即all返回数据展开成数组 [a, b]这样
axios.spread = function spread(cb) {
  return function wrap(arr) {
    return cb.apply(null, arr)
  }
}
// 指向类
axios.Axios = Axios

export default axios