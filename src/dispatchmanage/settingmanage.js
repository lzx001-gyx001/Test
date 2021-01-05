
import axios from 'axios'

// axios配置
const http = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5d41580a1a802c0d5e53dcc2/example/',
  // 可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  validateStatus: function(status) {
    // 更改状态码 不怎么用
    return status === 404
    // 此时设置成功状态码是404，所以就算地址错误，报404，但依旧会显示请求成功
  }
})
export default {
  name: 'create_validateStatus',
  methods: {
    postUrl() { // post方法
      http.post('bb123').then((res) => {
        console.log('post请求成功', res.data)
      }).catch((err) => {
        console.log('post请求成功', err)
      })
    }
  },
  created() {
    this.postUrl()
  }
}

