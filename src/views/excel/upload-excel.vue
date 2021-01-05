<template>
  <div class="app-container">
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <el-table
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column
        v-for="(item, index) of tableHeader"
        :key="index"
        :prop="item"
        :label="item"
      />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
    };
  },
  methods: {
    beforeUpload(file) {
      //这里调接口弄传表格
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning",
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
      // console.log("header",header)
      // console.log(this.tableData)
      this.formatData(results);
    },

    //data[i]
    //       上级分类: "业务"           category        parent                  ()
    // 上级分类(蒙): " ᠦᠢᠯᠡᠴᠢᠯᠡᠭᠡᠨ"                           parent_mgl           (父级名称蒙)
    // 上级分类Code: "02"               category_code   parentId(为parentId为0的数据的自身id)
    // 分类Code: "DoctorType"           code
    // 分类名称: "名医类型"             full_name
    // 分类名称(蒙): "ᠨᠠᠷᠠᠲᠤ ᠡᠮᠴᠢ ᠶᠢᠨ ᠲᠥᠷᠥᠯ ᠵᠦᠶᠯ"  full_name_mgl
    // 序号: "25"
    // 维护人员: "王智慧"
    // 维护时间: 44133
    formatData(data) {
      const reData = [];
      data.forEach((item) => { 
        let map = {};
        map.istreeCode = "1";
        map.istree = "树";
        map.remark = "";
        map.parentId = "2";
        map.enabled = "1";
        for (const key in item) {
          switch (key) {
            case "分类名称":
              map.fullName = item[key];
              break;
            case "分类Code":
              map.code = item[key];
              break;
            case "分类名称(蒙)":
              map.fullNameMgl = item[key];
              break;
            case "上级分类Code":
              map.categoryCode = item[key];
              break;
            case "上级分类(蒙)":
              map.parentMgl = item[key];
              break;
            case "上级分类":
              map.parent = item[key];
               map.category = item[key];
              break;
            case "说明":
              map.remark = item[key];
              break;
            case "父级id":
              map.parentId = item[key];
          }
        }
        reData.push(map);
      });
      console.log("reData打印", reData);
    },
  },
};
</script>
