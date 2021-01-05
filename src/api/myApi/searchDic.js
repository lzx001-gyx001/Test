
import request from '@/utils/request'

//获取列表sys/menu/find
/**
 * 
 * @param {*} data {
    "dictionary":{
        "companyCode":"999",
        "code":"Log"
    },
    "terminal":{
        "code":"01",
        "Text":"浏览器",
        "modelCode":"modelcode002",
        "model":"模块管理"}
  
 */
export function serachDic(data) {
  return request({
    url: 'dictionary',
    method: 'post',
    data
  })
}