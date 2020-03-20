import {
  isDate,
  isFormData,
  isPlainObject,
  isURLSearchParams,
  myExtend,
  deepMerge
} from '../../src/helpers/util'

describe('helpers: util', () => {
  describe('isXX', () => {
    test('data', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('plain object', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })

    // test('form data', () => {
    //   expect(isFormData(new FormData())).toBeTruthy()
    //   expect(isFormData({})).toBeFalsy()
    // })
  })

  describe('extend', () =>{
    test('should be mutable', ()=>{
      const a = Object.create(null)
    const b = {foo:123}
    myExtend(a, b)
    expect(a.foo).toBe(123)
    })

    test('extend properties', () =>{
      const a = {foo:123, bar:456}
      const b = {bar:789}
      const c = myExtend(a,b)
      expect(c.foo).toBe(123)
      expect(c.bar).toBe(789)
    })
  })
})