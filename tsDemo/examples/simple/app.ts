import axios, { AxiosError, AxiosTransformer } from '../../src/index'
import qs from 'qs'

const log = console.log.bind(this)

// axios({
//   method: 'post',
//   url: '/simple/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])
// axios({
//   method: 'post',
//   url: '/simple/buffer',
//   data: arr
// })

// axios({
//   method: 'post',
//   url: '/simple/post',
//   headers: {
//     'content-type': 'application/json',
//     'Accept': 'application, text/plain, */*'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
// axios({
//   method: 'post',
//   url: '/simple/post',
//   data: searchParams
// })

// axios({
//   method: 'post',
//   url: '/simple/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then(res => console.log(res.data, typeof res.data))

// axios({
//   method: 'get',
//   url: '/error/get1',
// }).then(res => console.log(res)).catch(e => {
//   console.log(e)
// })

// axios({
//   method: 'get',
//   url: '/error/get',
// }).then(res => console.log(res)).catch(e => {
//   console.log(e)
// })

// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/timeout',
//   }).then(res => console.log(res)).catch(e => {
//     console.log(e)
//   })
// }, 5000)

// axios({
//   method: 'get',
//   url: '/error/timeout',
//   timeout: 2000
// }).then(res => console.log(res)).catch((e: AxiosError) => {
//   console.log(e.message)
//   console.log(e.code)
//   console.log(e.request)
// })

// axios.request({
//   url: '/simple/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/error/get')
// axios.options('/extend/options')
// axios.head('/extend/head')
// axios.delete('/extend/delete')

// axios.put('/extend/put', { msg: 'put' })
// axios.post('/extend/post', { msg: 'post' })
// axios.patch('/extend/patch', { msg: 'patch' })

// axios('/extend/post', {
//   method:'post',
//   data: {
//     msg:'hello'
//   }
// })

// interface ResponseData<T=any>{
//   code: number
//   message: string
//   result: T
// }

// interface User {
//   name: string
//   age: number
// }
// // 修改后 axios<T>对应的是res.data的T
// function getUser<T>(){
//   return axios<ResponseData<T>>('/extend/user')
//     .then(res => res.data)
//     .catch(err => console.log(err))
// }

// async function test() {
//   const user = await getUser<User>()
//   if(user){console.log(user.result.name)}
// }
// test()

// axios.interceptors.request.use(config => {
//   config.headers.test += '1'
//   return config
// })

// axios.interceptors.request.use(config => {
//   config.headers.test += '2'
//   return config
// })

// axios.interceptors.request.use(config => {
//   config.headers.test += '3'
//   return config
// })

// axios.interceptors.response.use(res => {
//   res.data += '1'
//   return res
// })

// let interceptor = axios.interceptors.response.use(res => {
//   res.data += '2'
//   return res
// })

// axios.interceptors.response.use(res => {
//   res.data += '3'
//   return res
// })

// axios.interceptors.response.eject(interceptor)
// axios({
//   url: '/interceptor/get',
//   method: 'get',
//   headers: {
//     test: ''
//   },
// }).then( res => {
//   console.log(res.data)
// })

// axios.defaults.headers.common['test2'] = 123

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test:'321'
//   }
// }).then(res => {
//   log(res.data, typeof res.data)
// })

// axios({
//   transformRequest: [
//     (function (data) {
//       return data
//     }), ...(axios.defaults.transformRequest as AxiosTransformer[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     (function (data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     })
//   ],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
// }).then(res => log(res.data))
// const instance = axios.create({
//   transformRequest: [
//     (function (data) {
//       return data
//     }), ...(axios.defaults.transformRequest as AxiosTransformer[])
//   ],
//   transformResponse: [
//     ...(axios.defaults.transformResponse as AxiosTransformer[]),
//     (function (data) {
//       if (typeof data === 'object') {
//         data.b = 2
//       }
//       return data
//     })
//   ],
// })
// console.log(instance,'instance')
// instance({
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 1
//   },
// }).then(res => console.log(res.data))

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function (e) {
  if (axios.isCancel(e)) {
    console.log(`Request canceled`, e.message)
  }
})

setTimeout(() => {
  source.cancel('hhhh')
  axios.post('/cancel/post', { a: 1 }, {
    cancelToken: source.token
  }).catch(function (e) {
    if (axios.isCancel(e)) { console.log(`cancel for post`, e.message) }
  })
}, 100)
// 文件上传
const uploadEL = document.getElementById('upload')
uploadEL.addEventListener('click', function(e){
  let data = new FormData()
  const fileEL = document.getElementById('file') as HTMLInputElement
  if(fileEL.files) {
    data.append('file', fileEL.files[0])
  }
})