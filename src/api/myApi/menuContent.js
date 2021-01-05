// 目录 API
import request from '@/utils/request'

//获取列表sys/content/find
export function fetchContentList(data) {
  return request({
    url: 'sys/content/find',
    method: 'post',
    data
  })
}

//详情查询sys/content/detail
export function getSingle(data) {
  return request({
    url: 'sys/content/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/content/save
export function saveContent(data) {
  return request({
    url: 'sys/content/save',
    method: 'post',
    data
  })
}
//软删除 sys/content/state
export function changeContentState(data) {
  return request({
    url: `sys/content/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/content/delete
export function deleteContent(data) {
  return request({
    url: `sys/content/delete`,
    method: 'post',
    data
  })
}