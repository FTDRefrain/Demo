export default class Cancel {
  message?: string

  constructor(reason?:string){
    this.message = reason
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}