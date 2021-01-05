
// 字典明细表api
import request from '@/utils/request'



//列表查询
export function getDicDetail(data) {
  return request({
    url: `base/datadictionarydetail/find`,
    method: 'post',
    data
  })
}
//查询单条记录详细信息
export function getSingleDetail(query) {
  return request({
    url: `base/datadictionarydetail/detail`,
    method: 'post',
    data: {
      dataDictionaryId: query
    }
  })
}
//编辑、新增，有id编辑，没有新增,参数为数组
export function saveDetail(data){
  return request({
    url: `base/datadictionarydetail/save`,
    method: 'post',
    data
  })
}
//状态变更
export function changeDetailState(query){
  return request({
    url:`base/datadictionarydetail/state`,
    method:'post',
    data:query
  })
}
//删除
export function deleteDetailData(query){
  return request({
    url:`base/datadictionarydetail/delete`,
    method:'post',
    data:query
  })
}