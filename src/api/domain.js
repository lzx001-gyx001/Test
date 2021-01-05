import request from '@/utils/request'

// 域名列表
export function fetchList(data) {
  return request({
    url: '/admin/domain/list',
    method: 'post',
    params: data
  })
}

// var str1 = "jspang.com"
// const xiedajiao = str1 => {
//   return `hi${str1}`;
// }
// let a = 32
// str1 = a === 32 ? 'liuying' : "xiedajiao";

