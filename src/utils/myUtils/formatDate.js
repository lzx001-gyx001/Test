// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
export const format = function (date) {

  // console.log(new Date(date))
  //将某个时间对象转化为时间戳
  var timeStamp = new Date(date);
  var year = timeStamp.getFullYear() + '年';
  var month = timeStamp.getMonth() + 1 + '月';
  var date = timeStamp.getDate() + '日';
  return [year, month, date].join('-')
}

// console.log(format(new Date(2019,1,1,12,50,0,0)))
// var da = 1402233166999;

// da = new Date(da);

// var year = da.getFullYear() + '年';

// var month = da.getMonth() + 1 + '月';

// var date = da.getDate() + '日';

// console.log([year, month, date].join('-'));
