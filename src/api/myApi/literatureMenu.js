//文献目录API

import request from '@/utils/request'



//获取列表/business/lib/emenu/find
export function fetchLiteratureMenuList(data) {
  return request({
    url: '/business/lib/emenu/find',
    method: 'post',
    data
  })
}

//详情查询/business/lib/emenu/detail
export function getSingle(data) {
  return request({
    url: '/business/lib/emenu/detail',
    method: 'post',
    data
  })
}

//新增、编辑 /business/lib/emenu/save
export function saveLiteratureMenu(data) {
  return request({
    url: '/business/lib/emenu/save',
    method: 'post',
    data
  })
}
//软删除 business/botany/state
export function changeLiteratureMenuState(data) {
  return request({
    url: `/business/lib/emenu/state`,
    method: 'post',
    data
  })
}
//物理删除 /business/lib/emenu/delete
export function deleteLiteratureMenu(data) {
  return request({
    url: `/business/lib/emenu/delete`,
    method: 'post',
    data
  })
}