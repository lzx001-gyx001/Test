// 文件图标

import request from '@/utils/request'

//获取列表sys/fileIcon/find
export function fetchFileIconList(data) {
  return request({
    url: 'sys/fileicon/find',
    method: 'post',
    data
  })
}

//详情查询sys/fileicon/findl
export function getSingle(data) {
  return request({
    url: 'sys/fileicon/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/fileicon/save
export function saveFileIcon(data) {
  return request({
    url: 'sys/fileicon/save',
    method: 'post',
    data
  })
}
//软删除 sys/fileicon/state
export function changeFileIconState(data) {
  return request({
    url: `sys/fileicon/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/fileicon/delete
export function deleteFileIcon(data) {
  return request({
    url: `sys/fileicon/delete`,
    method: 'post',
    data
  })
}