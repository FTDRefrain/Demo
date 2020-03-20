import { AxiosPromise, AxiosRequestConfig, Method, AxiosResponse, ResolvedFn, RejectedFn } from '../types'
import dispatchRequest, {transformConfig} from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: interceptors
  defaults: AxiosRequestConfig

  constructor(initConfig: AxiosRequestConfig) {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    }
    this.defaults = initConfig
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) { config = {} }
      config.url = url // 实现axios(url, config)形式
    } else {
      config = url // axios(config)模式下
    }
    // 默认和传入合并
    config = mergeConfig(this.defaults, config)

    let chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined,
    }]
    // 挂载
    this.interceptors.request.forEach(i => chain.unshift(i)); // 后放先执行
    this.interceptors.response.forEach(i => chain.push(i)); // 先放先执行
    // 链式执行
    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise.then(resolved, rejected)
    }

    return promise
  }
  // 带请求数据
  _requestWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url,
    }))
  }
  // 没有请求数据
  _requestWithData(method: Method, url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data,
    }))
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('options', url, config)
  }

  post(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestWithData('post', url, config, data)
  }

  put(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestWithData('put', url, config, data)
  }

  patch(url: string, config?: AxiosRequestConfig, data?: any): AxiosPromise {
    return this._requestWithData('patch', url, config, data)
  }
  // 获取发送的url，
  getUri(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformConfig(config)
  }
}