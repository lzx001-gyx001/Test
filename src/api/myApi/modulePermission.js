// 角色权限分配

import request from "@/utils/request"


/**
 * 查询permission表 M代表Module
 * @param {*} data 
 */
export function searchPermission(data){
    return request({
        url:"base/module/permission/find",
        method:"post",
        data
    })
}

/**
 * 详情查询
 * @param {*} data 
 */
export function searchPermissionDetail(data){
    return request({
        url:"base/module/permission/detail",
        method:"post",
        data
    })
}


/**
 * 维护（新增，编辑）
 * @param {*} data 看文档
 */
export function savePermission(data){
    return request({
        url:"base/module/permission/save",
        method:"post",
        data
    })
}

/**
 * 修改状态软删除
 * @param {*} data 看文档
 */
export function changePermission(data){
    return request({
        url:"base/module/permission/state",
        method:"post",
        data
    })
}


/**
 * 物理删除
 * @param {*} data 看文档
 */
export function deletePermission(data){
    return request({
        url:"base/module/permission/delete",
        method:"post",
        data
    })
}