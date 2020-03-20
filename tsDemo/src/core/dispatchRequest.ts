/* axios编写 入口文件 */
import { AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosInstance } from '../types'
import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flatternHeaders } from '../helpers/headers'
import transform from '../core/transform'

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // TODO
  throwIfCancellationRequested(config) // 已经有reason则直接打断
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
// 转换后赋值
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformConfig(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers =  flatternHeaders(config.headers, config.method!)
}
// url转换
export function transformConfig(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if(baseURL && !isAbsoluteURL(url!)){
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer) // 确定不是null避免类型对不上用!断言
}

// function transformRequestConfig(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaderConfig(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if(config.cancelToken){
    config.cancelToken.throwIfRequest()
  }
}

export default dispatchRequest