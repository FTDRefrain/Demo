import axios from '../../src/index'

// foo[]=bar&foo[]=baz
axios({
  method: 'get',
  url:'/base/get',
  params:{
    foo:['bar','baz']
  }
})
// encode编码
axios({
  method: 'get',
  url:'/base/get',
  params:{
    foo:{
      bar:'baz'
    }
  }
})
// date=
const date = new Date()
axios({
  method: 'get',
  url:'/base/get',
  params:{
    date
  }
})
// 保留特殊字符 空格变+
axios({
  method: 'get',
  url:'/base/get',
  params:{
    foo: '@:$, '
  }
})
// null忽略
axios({
  method: 'get',
  url:'/base/get',
  params:{
    foo: 'bar',
    baz: null
  }
})
// #忽略
axios({
  method: 'get',
  url:'/base/get#hash',
  params:{
    foo: 'bar'
  }
})
// &补接
axios({
  method: 'get',
  url:'/base/get?foo=bar',
  params:{
    baz: 'baz'
  }
})