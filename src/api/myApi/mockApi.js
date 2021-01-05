import axios from "axios"

/**
 * 获取树结构数据
 */
export async function getMockTree() {
  return await axios.post("https://www.fastmock.site/mock/2f08bdb770affd7ebd2a76f9580d11dc/api/tree")
}

/**
 * 获取列表数据
 */
export async function getMockTable() {
    return await axios.post("https://www.fastmock.site/mock/2f08bdb770affd7ebd2a76f9580d11dc/api/mockColumn")
  }