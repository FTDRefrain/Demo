import { type } from "os"

// 更基础的方法

// 类型检测 使用类型保护确定输入类型
const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// 数据会有FormDate Buffer这种， toString不准确，正常走post 也不用担心
// 之前已经判断数组 不用考虑[]的情况了 同样null也判断了
export function isObject(val: any): val is Object {
  return typeof val === 'object'
}
// 一般对象判断
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
// FormData数据判断
export function isFormData(val:any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
}

export function myExtend<T, U>(to: T, from: U): T & U{
  for(const key in from){
    ;(to as T&U)[key] = from[key] as any
  }
  return to as T&U
}
// 简单深拷贝
export function deepMerge(...objs: any[]):any{
  const result = Object.create(null)
  
  objs.forEach(obj => {
    if(obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if(isPlainObject(val)){
          if(isPlainObject(result[key])){
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}