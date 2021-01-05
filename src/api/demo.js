import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/admin/enroll/list',
    method: 'post',
    data
  })
}

export function fetchPv(pv) {
  return request({
    url: '/admin/enroll/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  console.log('7777777777777777777777777777777777777777777')
  console.log(data)
  return request({
    url: '/admin/enroll/form',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/admin/enroll/form',
    method: 'post',
    data
  })
}
