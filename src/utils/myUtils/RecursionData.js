const data = [{
    cid: 1,
    parentId: 0,
    label: "父级1",
    code: "随笔"
  },
  {
    cid: 2,
    parentId: 0,
    label: "父级2",
    code: "ij"
  },
  {
    cid: 3,
    parentId: 1,
    label: "子级1",
    code: "kk"
  },
  {
    cid: 4,
    parentId: 1,
    label: "子级2",
    code: "生数据"
  },
  {
    cid: 5,
    parentId: 1,
    label: "子级3",
    code: "示框"
  },
  {
    cid: 6,
    parentId: 2,
    label: "子级4",
    code: "水库"
  },
  {
    cid: 7,
    parentId: 2,
    label: "子级5",
  }
]

/**
 * 递归得到树形JSON
 */
export const formatData = (function () {
  //递归得到childrenList
  function getChildren(id, data, idName) {
    let children = []
    data.forEach(item => { //循环获取子节点
      if (item.parentId == id) {
        let childrenNode = {
          ...item,
          label: item.fullName,
        }
        childrenNode[idName] = item[idName]
        // console.log("childrenNode",childrenNode)
        children.push(childrenNode)
      }
    });
    //递归获取子节点的子节点
    children.forEach(item => {
      let childrenCopy = getChildren(item[idName], data, idName)
      // console.log("childrenCopy打印", childrenCopy)
      if (childrenCopy.length > 0) {
        item.children = childrenCopy
      }
    })
    return children
  }
  //得到父级的对象
  function getFather(data, idName) {
    let val = []; //返回这个数组
    data.forEach(item => {
      if (item.parentId == "root") {
        //是父级      
        let parent = {
          ...item,
          label: item.fullName,
        }
        parent[idName] = item[idName]
        // console.log("parent",parent)
        parent.children = getChildren(item[idName], data, idName)
        val.push(parent)
      }
    })
    return val
  }
  return function (data, idName) {
    return getFather(data, idName)
  }
})()



export const formatDataOfParent = (function () {
  //递归得到childrenList
  function getChildren(id, data, idName) {
    let children = []
    data.forEach(item => { //循环获取子节点
      if (item.parentId == id) {
        let childrenNode = {
          ...item,
          label: item.fullName,
        }
        childrenNode[idName] = item[idName]
        // console.log("childrenNode",childrenNode)
        children.push(childrenNode)
      }
    });
    //递归获取子节点的子节点
    children.forEach(item => {
      let childrenCopy = getChildren(item[idName], data, idName)
      // console.log("childrenCopy打印", childrenCopy)
      if (childrenCopy.length > 0) {
        item.children = childrenCopy
      }
    })
    return children
  }
  //得到父级的对象
  function getFather(data, idName) {
    let val = []; //返回这个数组
    data.forEach(item => {
      if (item.parentId == "0") {
        //是父级      
        let parent = {
          ...item,
          label: item.fullName,
        }
        parent[idName] = item[idName]
        // console.log("parent",parent)
        parent.children = getChildren(item[idName], data, idName)
        val.push(parent)
      }
    })
    return val
  }
  return function (data, idName) {
    return getFather(data, idName)
  }
})()




export const formatDataOfParentMenu = (function () {
  //递归得到childrenList
  function getChildren(id, data, idName) {
    let children = []
    data.forEach(item => { //循环获取子节点
      if (item.parentMenuId == id) {
        let childrenNode = {
          ...item,
          label: item.menuName,
        }
        childrenNode[idName] = item[idName]
        // console.log("childrenNode",childrenNode)
        children.push(childrenNode)
      }
    });
    //递归获取子节点的子节点
    children.forEach(item => {
      let childrenCopy = getChildren(item[idName], data, idName)
      // console.log("childrenCopy打印", childrenCopy)
      if (childrenCopy.length > 0) {
        item.children = childrenCopy
      }
    })
    return children
  }
  //得到父级的对象
  function getFather(data, idName) {
    let val = []; //返回这个数组
    data.forEach(item => {
      if (item.parentMenuId == "") {
        //是父级      
        let parent = {
          ...item,
          label: item.menuName,
        }
        parent[idName] = item[idName]
        // console.log("parent",parent)
        parent.children = getChildren(item[idName], data, idName)
        val.push(parent)
      }
    })
    return val
  }
  return function (data, idName) {
    return getFather(data, idName)
  }
})()