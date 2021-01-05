//方剂API
import request from '@/utils/request'



//获取列表sys/recipe/find
export function fetchRecipeList(data) {
  return request({
    url: 'business/recipe/find',
    method: 'post',
    data
  })
}

//详情查询business/recipe/findl
export function getSingle(data) {
  return request({
    url: 'business/recipe/detail',
    method: 'post',
    data
  })
}

//新增、编辑 business/recipe/save
export function saveRecipe(data) {
  return request({
    url: 'business/recipe/save',
    method: 'post',
    data
  })
}
//软删除 business/recipe/state
export function changeRecipeState(data) {
  return request({
    url: `business/recipe/state`,
    method: 'post',
    data
  })
}
//物理删除 business/recipe/delete
export function deleteRecipe(data) {
  return request({
    url: `business/recipe/delete`,
    method: 'post',
    data
  })
}