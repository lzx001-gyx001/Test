// 文献API


import request from '@/utils/request'

//获取列表sys/literature/find
export function fetchLiteratureList(data) {
  return request({
    url: '/business/lib/literature/find',
    method: 'post',
    data
  })
}

//详情查询/business/lib/literature/detail
export function getSingle(data) {
  return request({
    url: '/business/lib/literature/detail',
    method: 'post',
    data
  })
}

//新增、编辑 /business/lib/literature/save
export function saveLiterature(data) {
  return request({
    url: '/business/lib/literature/save',
    method: 'post',
    data
  })
}
//软删除 /business/lib/literature/state
export function changeLiteratureState(data) {
  return request({
    url: `/business/lib/literature/state`,
    method: 'post',
    data
  })
}
//物理删除 /business/lib/literature/delete
export function deleteLiterature(data) {
  return request({
    url: `/business/lib/literature/delete`,
    method: 'post',
    data
  })
}
