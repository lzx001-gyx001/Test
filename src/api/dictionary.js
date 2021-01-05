
//字典tree API
import request from '@/utils/request'



//列表查询
export function fetchList(data) {
  return request({
    url: 'base/datadictionary/find',
    method: 'post',
    data
  })
}
//查询单条记录详细信息
export function getDetail(query) {
  return request({
    url: `base/datadictionary/detail`,
    method: 'post',
    data: {
      dataDictionaryId: query
    }
  })
}
//编辑、新增，有id编辑，没有新增,参数为数组
export function save(data){
  return request({
    url: `base/datadictionary/save`,
    method: 'post',
    data
  })
}
//状态变更
export function changeState(query){
  return request({
    url:'base/datadictionary/state',
    method:'post',
    data:query
  })
}
//删除
export function deleteData(query){
  return request({
    url:'base/datadictionary/delete',
    method:'post',
    data:query
  })
}