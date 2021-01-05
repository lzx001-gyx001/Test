//简历管理 API

import request from '@/utils/request'

//获取列表sys/resume/find
export function fetchResumeList(data) {
  return request({
    url: 'sys/resume/find',
    method: 'post',
    data
  })
}

//详情查询sys/resume/findl
export function getSingle(data) {
  return request({
    url: 'sys/resume/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/resume/save
export function saveResume(data) {
  return request({
    url: 'sys/resume/save',
    method: 'post',
    data
  })
}
//软删除 sys/resume/state
export function changeResumeState(data) {
  return request({
    url: `sys/resume/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/resume/delete
export function deleteResume(data) {
  return request({
    url: `sys/resume/delete`,
    method: 'post',
    data
  })
}