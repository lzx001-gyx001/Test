//部门管理 API
import request from '@/utils/request'

//获取列表sys/department/find
export function fetchDepartmentList(data) {
  return request({
    url: 'sys/department/find',
    method: 'post',
    data
  })
}

//详情查询sys/department/detail
export function getSingle(data) {
  return request({
    url: 'sys/department/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/department/save
export function saveDepartment(data) {
  return request({
    url: 'sys/department/save',
    method: 'post',
    data
  })
}
//软删除 sys/department/state
export function changeDepartmentState(data) {
  return request({
    url: `sys/department/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/department/delete
export function deleteDepartment(data) {
  return request({
    url: `sys/department/delete`,
    method: 'post',
    data
  })
}

//引入 sys/department/quote
export function importDepartment(data) {
  return request({
    url: `sys/department/quote`,
    method: 'post',
    data
  })
}
