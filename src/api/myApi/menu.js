// 栏目、目录 API


import request from '@/utils/request'

//获取列表sys/menu/find
export function fetchMenuList(data) {
  return request({
    url: 'sys/menu/find',
    method: 'post',
    data
  })
}

//详情查询sys/menu/detail
export function getSingle(data) {
  return request({
    url: 'sys/menu/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/menu/save
export function saveMenu(data) {
  return request({
    url: 'sys/menu/save',
    method: 'post',
    data
  })
}
//软删除 sys/menu/state
export function changeMenuState(data) {
  return request({
    url: `sys/menu/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/menu/delete
export function deleteMenu(data) {
  return request({
    url: `sys/menu/delete`,
    method: 'post',
    data
  })
}
