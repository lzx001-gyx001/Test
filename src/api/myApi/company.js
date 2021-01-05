//单位管理 API

import request from '@/utils/request'

//获取列表base/company/find
export function fetchCompanyList(data) {
  return request({
    url: 'base/company/find',
    method: 'post',
    data
  })
}

//详情查询base/company/detail
export function getSingle(data) {
  return request({
    url: 'base/company/detail',
    method: 'post',
    data
  })
}

//新增、编辑 base/company/save
export function saveCompany(data) {
  return request({
    url: 'base/company/save',
    method: 'post',
    data
  })
}
//软删除 base/company/state
export function changeCompanyState(data) {
  return request({
    url: `base/company/state`,
    method: 'post',
    data
  })
}
//物理删除 base/company/delete
export function deleteCompany(data) {
  return request({
    url: `base/company/delete`,
    method: 'post',
    data
  })
}
