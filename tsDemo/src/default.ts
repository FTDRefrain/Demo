import { AxiosRequestConfig } from './types'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
// 默认参数
const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'CSRF_TOKEN',
  xsrfHeaderName: 'X-CSRF-TOKEN',
  transformRequest: [function (data: any, headers?: any): any {
    headers = processHeaders(headers, data)
    return transformRequest(data)
  },],
  transformResponse: [function (data: any): any {
    return transformResponse(data)
  },],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  },
}

const requestDataMethod = ['put', 'post', 'patch']
requestDataMethod.forEach(m => {
  defaults.headers[m] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const requestNoDataMethod = ['get', 'delete', 'head', 'options']
requestNoDataMethod.forEach(m => {
  defaults.headers[m] = {}
})

export default defaults