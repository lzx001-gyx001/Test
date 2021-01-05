//短信管理 API

import request from '@/utils/request'

//获取列表sys/sms/find
export function fetchSmsList(data) {
  return request({
    url: 'sys/sms/find',
    method: 'post',
    data
  })
}

//详情查询sys/sms/detail
export function getSingle(data) {
  return request({
    url: 'sys/sms/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/sms/save
export function saveSms(data) {
  return request({
    url: 'sys/sms/save',
    method: 'post',
    data
  })
}
//软删除 sys/sms/state
export function changeSmsState(data) {
  return request({
    url: `sys/sms/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/sms/delete
export function deleteSms(data) {
  return request({
    url: `sys/sms/delete`,
    method: 'post',
    data
  })
}
