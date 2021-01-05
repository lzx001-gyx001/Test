//蒙医药用管理

//方剂API
import request from '@/utils/request'



//获取列表sys/botany/find
export function fetchBotanyList(data) {
  return request({
    url: 'business/botany/find',
    method: 'post',
    data
  })
}

//详情查询business/botany/findl
export function getSingle(data) {
  return request({
    url: 'business/botany/detail',
    method: 'post',
    data
  })
}

//新增、编辑 business/botany/save
export function saveBotany(data) {
  return request({
    url: 'business/botany/save',
    method: 'post',
    data
  })
}
//软删除 business/botany/state
export function changeBotanyState(data) {
  return request({
    url: `business/botany/state`,
    method: 'post',
    data
  })
}
//物理删除 business/botany/delete
export function deleteBotany(data) {
  return request({
    url: `business/botany/delete`,
    method: 'post',
    data
  })
}