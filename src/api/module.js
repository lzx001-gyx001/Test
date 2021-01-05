import request from '@/utils/request'



//列表查询
export function getModuleList(data) {
  return request({
    url: 'base/module/find',
    method: 'post',
    data
  })
}
//查询单条记录详细信息
export function getModuleDetail(query) {
  return request({
    url: `base/module/detail`,
    method: 'post',
    data: {
      dataDictionaryId: query
    }
  })
}
//编辑、新增，有id编辑，没有新增,参数为数组
export function saveModule(data){
  return request({
    url: `base/module/save`,
    method: 'post',
    data
  })
}
//状态变更
export function changeModuleState(query){
  return request({
    url:'base/module/state',
    method:'post',
    data:query
  })
}
//删除
export function deleteModuleData(query){
  return request({
    url:'base/module/delete',
    method:'post',
    data:query
  })
}