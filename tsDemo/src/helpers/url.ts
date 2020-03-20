// 一些辅助函数
import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

// 编码函数
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+') // 约定空格转换成+
    .replace(/%5B/g, '[')
    .replace(/%5D/g, ']')
}
// 拼接url
export function buildURL(url: string, params: any, paramsSerializer?: (params: any) => string): string {
  // 空参数直接返回
  if (!params) { return url }
  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if(isURLSearchParams(params)){
    serializedParams = params.toString()
  } else {
    const parts: string[] = []
    // 遍历所有属性
    Object.keys(params).forEach(key => {
      const val = params[key]
      // 属性值为null或者undefined跳出循环 forEach的return是跳出
      if (val === null || typeof val === 'undefined') {
        return
      }
      let values = []
      // 值是数组的话给key做标记，不是数组 类型转化 方便遍历
      if (Array.isArray(val)) {
        values = val
        key += '[]'
      } else {
        values = [val]
      }
      values.forEach(v => {
        if (isDate(v)) {
          v = v.toISOString()
        } else if (isPlainObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(`${encode(key)}=${encode(v)}`)
      })
    })

    serializedParams = parts.join('&')
  }

  // 防止全空字段
  if (serializedParams) {
    // 忽略后面#的情况
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // ？用&去拼接，裸url先补？
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
// http https // 都算
export function isAbsoluteURL(url: string): boolean {
  return /(^[a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}
// 拼接 将base末尾和relative开头的/都干掉 再拼
export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace('/^\/+/', '') : baseURL
}

// 同源检测方法
const urlParsingNode = document.createElement('a')
function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return {
    protocol,
    host,
  }
}
export function isURLSameOrigin(requestURL: string): boolean {
  const current = resolveURL(window.location.href)
  const requestOrigin = resolveURL(requestURL)
  return (current.protocol === requestOrigin.protocol && current.host === requestOrigin.host)
}

