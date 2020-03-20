import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: AxiosRequestConfig | XMLHttpRequest,
    response?: AxiosResponse,
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
    // ts里面继承js固有类要进行this绑定
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
// 工厂函数用来创建
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: AxiosRequestConfig | XMLHttpRequest,
  response?: AxiosResponse,
) {
  return new AxiosError(message, config, code, request, response)
}