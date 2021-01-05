//角色管理 API

import request from '@/utils/request'

//获取列表base/roles/find
export function getRoles(data) {
  return request({
    url: '/base/roles/find',
    method: 'post',
    data
  })
}

//详情查询base/roles/detail
export function getSingle(data) {
  return request({
    url: '/base/roles/detail',
    method: 'post',
    data
  })
}

//新增、编辑 base/roles/save
export function saveRole(data) {
  return request({
    url: '/base/roles/save',
    method: 'post',
    data
  })
}
//软删除 base/roles/state
export function remarkRole(data) {
  return request({
    url: `base/roles/state`,
    method: 'post',
    data
  })
}
//物理删除 base/roles/delete
export function deleteRole(data) {
  return request({
    url: `base/roles/delete`,
    method: 'post',
    data
  })
}
