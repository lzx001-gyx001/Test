import request from '@/utils/request'

// 在线直播列表
export function fetchList(data) {
  return request({
    url: '/admin/live/LiveStreamOnlineList',
    method: 'post',
    params: data
  })
}
// 推断流事件查询
export function fetchArticle(id) {
  return request({
    url: '/admin/live/LiveStreamEventList',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
