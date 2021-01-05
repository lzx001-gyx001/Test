


export function handleFilterSortCode(sortCode){
  return sortCode.replace(/\b(0+)/gi, "")
}