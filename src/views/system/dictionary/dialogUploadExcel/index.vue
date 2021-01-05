<!-- upload -->
<template>
  <el-row>
    <!-- <el-upload
      ref="upload"
      class="upload-box"
      action=""
      :limit="1"
      :http-request="handleUpload"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->

    <input
      class="file"
      name="uploadfile"
      type="file"
      accept=".xlsx"
      @change="handleUpload"
    />
    <!-- <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        点击上传
      </el-button> -->
    <!-- <upload-excel-component :before-upload="beforeUpload" /> -->

    <!-- <form action="http://myrmt.myyzk.cn:1001/base/datadictionary/import" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <input type="submit" id="submitInput" value="上传">
    </form> -->
  </el-row>
</template>

<script>
// import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { dicImport } from "@/api/myApi/dictionary";

export default {
  components: {},

  data() {
    //这里存放数据
    return {
      // chooseDicId: "", //选择的字典id
      // tableData: [], //放要上传excel的json
      // tableHeader: [],
    };
  },
  methods: {
    async handleUpload(e) {
      // console.log(e);
      // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYWVhMTA1MC0xYWEwLTQzYmQtODBlYy00NTVlNmNhNWFkMWIiLCJhY2NvdW50IjoiYWRtaW4iLCJjb21wYW55Q29kZSI6Ijk5OSIsImNvbXBhbnkiOiLmgLvotKblpZciLCJyZWFsTmFtZSI6Iui2hee6p-euoeeQhuWRmCIsImV4cCI6MTYwNjgxNzExMywiaXNzIjoiaXJpcy1jYXNiaW5zLWp3dCJ9.rt1jd1ThO6CYhr5HVVB2TnzXniAAxNKrs1vyqVaqbbk"
      let file = e.target.files[0];
      // let file = e.file
      let param = new FormData(); //创建form对象
      param.append("uploadfile", file); //通过append向form对象添加数据
      param.append("code", "01");
      param.append("text", "浏览器");
      param.append("modelCode", "111");
      param.append("model", "数据字典");
      try {
        const res = await dicImport(param);
        if (res.code == 200) {
          this.$emit("hideDialogUpload", false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // async beforeUpload(file) {
    //   let query = {
    //     uploadfile: file,

    //   };
    //   try {
    //     const res = await dicImport(file);
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }

    //   //这里调接口弄传表格
    //   // const isLt1M = file.size / 1024 / 1024 < 1;
    //   // if (isLt1M) {
    //   //   console.log("上传的字典",file)
    //   //   return true;
    //   // }
    //   // this.$message({
    //   //   message: "文件超过1M",
    //   //   type: "warning",
    //   // });
    //   // return false;
    // },
    //标签的event  :on-success="handleSuccess"
    // async handleSuccess({ results, header }) {
    //   //results是excel的数组，header是表头
    //   this.tableData = this.formatData(results);
    //   console.log("上传的数据", this.tableData);
    //   try {
    //     const res = await dicUpload(this.tableData);
    //     this.$emit("hideDialogUpload", false);
    //     if (res.code == 200) {
    //       this.$message("上传成功", "提示");
    //     }
    //   } catch (error) {}
    // },

    // formatData(data) {
    //   const reData = [];
    //   data.forEach((item) => {
    //     let map = {};
    //     map.istreeCode = "1";
    //     map.istree = "树";
    //     map.remark = "";
    //     map.parentId = this.chooseDicId;
    //     map.enabled = "1";
    //     for (const key in item) {
    //       switch (key) {
    //         case "分类名称":
    //           map.fullName = item[key];
    //           break;
    //         case "code":
    //           map.code = item[key];
    //           break;
    //         case "分类名称(蒙)":
    //           map.fullNameMgl = item[key];
    //           break;
    //         case "上级分类Code":
    //           map.categoryCode = item[key];
    //           break;
    //         case "上级分类(蒙)":
    //           map.parentMgl = item[key];
    //           break;
    //         case "上级分类":
    //           map.parent = item[key];
    //           map.category = item[key];
    //           break;
    //         case "说明":
    //           map.remark = item[key];
    //           break;
    //         case "父级id":
    //           map.parentId = item[key];
    //       }
    //     }
    //     reData.push(map);
    //   });
    //   // console.log("reData打印", reData);
    //   return reData;
    // },
  },
  created() {
    console.log("**** 上传 -- 弹窗组件被加载了");
  },
  mounted() {},
  destroyed() {
    console.log("**** 上传 -- 弹窗组件被卸载了");
  },
};
</script>
<style lang='scss' scoped>
</style>