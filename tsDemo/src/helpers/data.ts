import {isPlainObject} from './util'

export function transformRequest(data: any): any {
  if(isPlainObject(data)){
    return JSON.stringify(data)
  }
  return data
}
// string类型的数据转成json
export function transformResponse(data: any): any {
  if(typeof data === 'string'){
    try{
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}