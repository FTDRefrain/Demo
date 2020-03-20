import { isPlainObject, deepMerge } from './util'

// 规范化属性
function normalizeHeaders(headers: any, name: string): void {
  if (!headers) { return }
  Object.keys(headers).forEach(k => {
    if (k !== name && (k.toUpperCase() === name.toUpperCase())) {
      headers[name] = headers[k]
      delete headers[k]
    }
  })
}

// 添加头信息
export function processHeaders(headers: any, data: any): any {
  normalizeHeaders(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
// 转换头部字符串到对象
export function parseHeaders(headers: string): Object {
  let parsed = Object.create(null)
  if (!headers) { return parsed }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    if (!key) { return }
    key = key.trim().toLowerCase()
    if (val) { val = val.trim() }
    parsed[key] = val
  })
  return parsed
}
// 展开header字段，除开特定字段不要
export function flatternHeaders(headers: any, method: string): any {
  if (!headers) { return headers }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodsToDelete = ['get', 'delete', 'head', 'options', 'put', 'patch', 'common', 'post']
  methodsToDelete.forEach(m => (delete headers[m]))
  return headers
}