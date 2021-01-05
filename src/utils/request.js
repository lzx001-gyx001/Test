import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import {getBrowserName} from "./myUtils/getBrowserName"

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000// , // request timeout
  // validateStatus: function(status) {
  //   // 更改状态码 不怎么用
  //   return status === null
  //   // 此时设置成功状态码是404，所以就算地址错误，报404，但依旧会显示请求成功
  // }
})

// request interceptor
service.interceptors.request.use(
  config => {
    //新增
   const token = localStorage.getItem('token') 
   if(token){
    config.headers['Authorization'] = 'Bearer ' + token
    //获取浏览器名称
    config.headers['equipment'] = "HBV-01925-16VY-3295"
   }
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      //获取浏览器名称
      config.headers['equipment'] = "HBV-01925-16VY-3295"
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data
    if (res.code === 401) {
      store.dispatch('user/resetToken')
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    } else if (res.code === 400) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code === 500) {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
    } else if (res.code !== 200) {
      Notification.error({
        title: response.data.msg
      })
      return Promise.reject('error')
    } else if (res.code === 10009) {
      // 请自行在引入 MessageBox
      // import { Message, MessageBox } from 'element-ui'
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      // return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    if (error.response) {
      Message({
        message: error.response.data.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.response.data)
  }
)

export default service

