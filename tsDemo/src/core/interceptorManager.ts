import {ResolvedFn, RejectedFn} from '../types'

interface IntercepterType<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<IntercepterType<T> | null>
  
  constructor(){
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1 
  }

  eject(id: number): void {
    if(this.interceptors[id]){
       this.interceptors[id] = null
    }
  }

  forEach(fn: (interceptor: IntercepterType<T>) => void): void {
    this.interceptors.forEach(i => {
      if(i) {fn(i)}
    })
  }
}