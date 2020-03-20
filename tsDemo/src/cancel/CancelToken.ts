import { CancelExecutor, Canceler, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(rs => { resolvePromise = rs })

    executor(messsage => {
      if (this.reason) { return } // 防止多次调用
      this.reason = new Cancel(messsage)
      resolvePromise(this.reason)
    })
  }
  // 已经使用 再次请求直接退出
  throwIfRequest() {
    if(this.reason){
      throw this.reason
    }
  }
  //
  static source(): CancelTokenSource {
    let cancel!: Canceler // 人为断言cancel不为空 后面是new时候赋值
    const token = new CancelToken(c => cancel = c) // 把executor函数给cancel
    return {
      token,
      cancel
    }
  }
}