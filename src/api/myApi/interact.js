//互动管理 API

import request from '@/utils/request'

//获取列表sys/interact/find
export function fetchInteractList(data) {
  return request({
    url: 'sys/interact/find',
    method: 'post',
    data
  })
}

//软删除 sys/interact/state
export function changeInteractState(data) {
    return request({
      url: `sys/interact/state`,
      method: 'post',
      data
    })
  }
  //物理删除 base/interact/delete
  export function deleteInteract(data) {
    return request({
      url: `sys/interact/delete`,
      method: 'post',
      data
    })
  }
  