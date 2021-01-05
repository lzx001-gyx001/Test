let str = "http://sdfsafasdf.com/admin/asdfsfasdf.jpg"
// let str2,
//   str1;
//方法1
// const index = str.indexOf("\/");
// str1 = str.substring(0, index )
// str2 = str.substring(index, str.length)
// console.log(str1, str2)


//方法2
str = str.replace(/^([^\/]*\/[^\/]*\/[^\/]*\/)(.*)$/,"$1,$2")

console.log(str.split(","))