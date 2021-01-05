// 图片明细


import request from '@/utils/request'

//获取列表sys/picture/find
export function fetchPictureList(data) {
  return request({
    url: 'sys/picture/find',
    method: 'post',
    data
  })
}

//详情查询sys/picture/findl
export function getSingle(data) {
  return request({
    url: 'sys/picture/detail',
    method: 'post',
    data
  })
}

//新增、编辑 sys/picture/save
export function savePicture(data) {
  return request({
    url: 'sys/picture/save',
    method: 'post',
    data
  })
}
//软删除 sys/picture/state
export function changePictureState(data) {
  return request({
    url: `sys/picture/state`,
    method: 'post',
    data
  })
}
//物理删除 sys/picture/delete
export function deletePicture(data) {
  return request({
    url: `sys/picture/delete`,
    method: 'post',
    data
  })
}