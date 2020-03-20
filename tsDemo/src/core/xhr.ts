import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import cookie from '../helpers/cookie'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
// 发送请求
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((rs, rj) => {
    const {
      data = null,
      method = 'get',
      url,
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus,
    } = config
    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)
    // 状态码错误
    function handleResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        rs(response)
      } else {
        rj(createError(`Request failed with status ${response.status}`, config, null, request, response))
      }
    }

    function configureRequest(): void {
      if (responseType) { request.responseType = responseType }
      if (timeout) { request.timeout = timeout }
      if (withCredentials) { request.withCredentials = withCredentials }
    }

    function addEvents(): void {
      // 请求响应逻辑
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) { return }

        if (request.status === 0) { return } // 网络或者超时错误直接返回
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config, // 挂载了config
          request,
        }
        handleResponse(response)
      }
      // 网络错误
      request.onerror = function handleError() {
        rj(createError('network error', config, null, request))
      }
      // 超时错误
      request.ontimeout = function handleTimeout() {
        rj(createError(`Timeout of ${timeout} ms  exceeded`, config, 'ECONNABORTED', request))
      }
      // 上传和下载监控
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // token添加
      if ((withCredentials) || isURLSameOrigin(url!) && xsrfCookieName) {
        const value = cookie.read(xsrfCookieName!)
        if (xsrfHeaderName && value) {
          headers[xsrfHeaderName] = value
        }
      }
      // authorization 添加
      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        // 空data 不设置header
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          rj(reason)
        })
      }
    }
  })
}

export default xhr