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
export function save(data) {
  return request({
    url: `base/datadictionary/save`,
    method: 'post',
    data
  })
}
//状态变更
export function changeState(query) {
  return request({
    url: 'base/datadictionary/state',
    method: 'post',
    data: query
  })
}
//删除
export function deleteData(query) {
  return request({
    url: 'base/datadictionary/delete',
    method: 'post',
    data: query
  })
}



/**
 * 下载（load）引入字典
 * @param {, 要引入的字典的id，但是要符合接口的传参要求} data 
 */
export function dicLoad(data){
  return request({
    url:`base/datadictionary/quote`,
    method:"post",
    data
  })
}


/**
 * 生成字典,更新字典数据
 * @param {*} data 
 */
export function dicCreate(data){
  return request({
    url:`base/datadictionary/create`,
    method:"post",
    data
  })
}

//导入字典Excel
export function dicImport(data){
  return request({
    url:`base/datadictionary/import`,
    method:"post",
    headers:{
      'Content-Type': "multipart/form-data; boundary="+new Date()
    },
    data
  })
}