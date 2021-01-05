import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',    // /vue-element-admin/user/login
    method: 'post',
    data
  }).catch(function(err) {
    console.log('服务端请求，错误返回')
    // eslint-disable-next-line no-undef
    response(err)
  })
}

export function refreshtoken(data) {
  return request({
    url: '/user/refreshtoken',
    method: 'post',
    data
  }).catch(function(err) {
    // eslint-disable-next-line no-undef
    response(err)
  })
}

export function getInfo() {
  return request({
    url: '/user/getinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/users/',
    method: 'get',
    params: query
  })
}
