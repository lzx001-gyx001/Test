//引入cos sdk    npm i cos-nodejs-sdk-v5 --save   //安装cos的sdk
//https://menyiwenhua-1302002665.cos.ap-beijing.myqcloud.com/  获取图片接口
// import {COS} from "cos-nodejs-sdk-v5";
var COS = require('cos-js-sdk-v5');
/**
 * 
 * @param {*} file 上传的文件
 * @param {*} fileExtName 文件后缀名
 * @param {*} docName 目录名称
 */
export function handleupload(file, fileExtName, docName) {
  let _this = this;
  // file = e.file;
  if (!file) {
    return
  }
  //改名（不重复)
  let timestamp = new Date().getTime();
  let end = 999999
  let start = 999
  let differ = end - start
  let random = Math.random()
  random = (start + differ * random).toFixed(0)
  _this.originName = `${docName}/` + timestamp + random + '.' + `${fileExtName}`;
  _this.originSize = file.size;
  // 实例化对象
  var cos = new COS({
    AppId: "1302002665",
    SecretId: "AKIDsWLunRubleGbfYlj23oLGuKSIr88886o", //你的SecretId
    SecretKey: "Zw1oKbmiSv9XeYDesvilIdiV0g4A2f19", //你的SecretKey
  })
  // 上传
  return new Promise((resolve, reject) => {
    cos.putObject({
      Bucket: "menyiwenhua-1302002665", //存储桶名
      Region: "ap-beijing", //地区简写
      Key: _this.originName, // 文件名
      Body: file, // 上传文件对象
      onProgress: function (progressData) {
        _this.percentage = parseInt(progressData.percent * 100);
        _this.isDisabled = true; // 禁止上传
        // $('.j-submit').attr('disabled', true); // 禁止提交表单
      if(_this.submitBtn){
        _this.submitBtn = true //禁止提交表单
      } 
      }
    }, function (err, data) {
      if (data && data.Location && data.statusCode == 200) {
        resolve(data)
      }
      if (err) {
        _this.$message('上传文件失败', "提示");
        reject(err)

      }
      // _this.isDisabled = false;
      // _this.uploadFail = true;
      // $('.j-submit').attr('disabled', false);
    });
  })


}



// cos.putObject({
//   Bucket: "menyiwenhua-1302002665", //存储桶名
//   Region: "ap-beijing", //地区简写
//   Key: _this.originName, // 文件名
//   Body: file, // 上传文件对象
//   onProgress: function (progressData) {
//     _this.percentage = parseInt(progressData.percent * 100);
//     _this.isDisabled = true; // 禁止上传
//     // $('.j-submit').attr('disabled', true); // 禁止提交表单
//     _this.submitBtn = true //禁止提交表单
//   }
// }, function (err, data) {
//   console.log("upload打印", err || data);
//   if (data && data.Location && data.statusCode == 200) {
//     _this.submitBtn = false;
//     _this.temp.imageUrl = data.Location
//   }
//   if (err) {
//     _this.$message('上传文件失败',"提示");
//   }
//   _this.isDisabled = false;
//   _this.uploadFail = true;
//   // $('.j-submit').attr('disabled', false);
// });
