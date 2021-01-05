const {
  serachDic
} = require("@/api/myApi/searchDic")

async function getDicList(type) {
  
  let searchQuery = {
    dictionary: {
      companyCode: "999",
      code: type,
    },
    page: {
      pageNumber: 1,
      pageNumber: 50,
      sortOrder: "desc",
      sort_name: "code",
    },
    terminal: {
      code: "01",
      Text: "浏览器",
      modelCode: "modelcode02",
      model: "用户模块",
    },
  };
  return new Promise(async(resolve, reject) => {
    try {
      const res = await serachDic(searchQuery);
      if (res.code == 200) {
        resolve(res.data);
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 传入一个要查询的字段的数组,返回对应的数据
 * @param {*} arr 要查询的字段的数组
 */
export async function getAllDropList(arr) {
  return await Promise.all(
    arr.map(async (item) => {
      return await getDicList(item)
    })
  )
}
