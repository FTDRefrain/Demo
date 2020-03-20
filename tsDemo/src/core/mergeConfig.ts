import { AxiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/util'

function defaultMergeStrat(v1: any, v2: any): any {
  return v2 !== null ? v2 : v1
}
// 用v2的值 没有则不用
function fromVal2Strat(v1: any, v2: any): any {
  if (typeof v2 !== 'undefined') { return v2 }
}

function deepMergeStrat(v1: any, v2: any): any {
  if (isPlainObject(v2)) {
    return deepMerge(v1, v2)
  } else if (typeof v2 !== 'undefined') {
    return v2
  } else if (isPlainObject(v1)) {
    return deepMerge(v1)
  } else if (typeof v1 !== 'undefined') {
    return v1
  }
}

let strats = Object.create(null)
const stratKeysFromVal2 = ['url', 'params', 'data']
const deepMergeKeys = ['headers', 'auth']

stratKeysFromVal2.forEach(k => {
  strats[k] = fromVal2Strat
})
deepMergeKeys.forEach(k => {
  strats[k] = deepMergeStrat
})

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) { config2 = {} as any }
  let config = Object.create(null)

  function mergeField(key: string): void {
    const strat = strats[key] || defaultMergeStrat
    config[key] = strat(config1[key], config2![key])
  }

  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2![key]) { mergeField(key) }
  }
  return config
}



