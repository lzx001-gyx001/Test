<!--  -->
<template>
  <el-row>
    <input
      class="file"
      name="uploadfile"
      type="file"
      accept=".xlsx"
      @change="handleUpload"
    />
  </el-row>
</template>

<script>
import { moduleImport } from "@/api/myApi/systemModule";
export default {
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  methods: {
    async handleUpload(e) {
      let file = e.target.files[0];
      let param = new FormData(); //创建form对象
      param.append("uploadfile", file); //通过append向form对象添加数据
      param.append("code", "01");
      param.append("text", "浏览器");
      param.append("modelCode", "111");
      param.append("model", "数据字典");
      try {
        const res = await moduleImport(param);
        if (res.code == 200) {
          this.$emit("hideDialogUpload", false);
        }
      } catch (error) {
        console.log("上传错误打印：",error);
      }
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang='scss' scoped>
</style>