// 附件管理
import request from '@/utils/request'

//获取列表sys/file/find
export function fetchFileList(data) {
  return request({
    url: 'sys/file/find',
    method: 'post',
    data
  })
}

//详情查询sys/file/findl
export function getSingle(data) {
  return request({
    url: 'sys/file/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/file/save
export function saveFile(data) {
  return request({
    url: 'sys/file/save',
    method: 'post',
    data
  })
}
//软删除 sys/file/state
export function changeFileState(data) {
  return request({
    url: `sys/file/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/file/delete
export function deleteFile(data) {
  return request({
    url: `sys/file/delete`,
    method: 'post',
    data
  })
}