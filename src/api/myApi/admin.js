//用户管理

import  request  from "@/utils/request"




//获取列表sys/users/find
export function fetchUsersList(data) {
  return request({
    url: 'sys/users/find',
    method: 'post',
    data
  })
}

//详情查询sys/users/detail
export function getSingle(data) {
  return request({
    url: 'sys/users/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/users/save
export function saveUsers(data) {
  return request({
    url: 'sys/users/save',
    method: 'post',
    data
  })
}
//软删除 sys/users/state
export function changeUsersState(data) {
  return request({
    url: `sys/users/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/users/delete
export function deleteUsers(data) {
  return request({
    url: `sys/users/delete`,
    method: 'post',
    data
  })
}

//引入 sys/users/quote
export function importUsers(data) {
  return request({
    url: `sys/users/quote`,
    method: 'post',
    data
  })
}
