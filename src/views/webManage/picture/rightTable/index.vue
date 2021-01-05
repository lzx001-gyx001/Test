<!-- 图片表格 -->
<template>
  <el-table
    ref="dataFormEdit"
    :key="0"
    v-loading="listLoading"
    :data="tableList"
    highlight-current-row
    border
    style="width: 100%"
  >
    <!-- 序号 -->
    <el-table-column
      width="60"
      align="center"
      label="序号"
      type="index"
      :index="indexMethod"
    >
    </el-table-column>

    <el-table-column
      style="cursor: pointer"
      :label="setHeaders(name)"
      align="center"
      :key="key"
      v-for="(head, name, key) in filterList[0]"
      show-overflow-tooltip
    >
      <template slot-scope="{ row }">
        <span @click="handleClick(head, name, key)">{{ row[name] }}</span>
      </template>
    </el-table-column>
    <!-- 有效 -->

    <el-table-column label="有效" width="80" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      width="260"
      :label="$t('table.actions')"
      align="center"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row }">
        <!-- 新增 -->
        <!-- 编辑按钮 -->
        <!-- <el-button
          ref="dataFormEdit"
          type="primary"
          size="mini"
          @click="handleUpdate(row)"
          >{{ $t("table.edit") }}</el-button
        > -->

        <!-- 删除按钮 -->
        <el-button size="mini" type="danger" @click="handleDelete(row)">{{
          "删除"
        }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    listLoading: {
      type: Boolean,
      default: false,
      required: true,
    },
    tableList: {
      type: Array,
      defauult: () => [],
      required: true,
    },
  },
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  computed: {
    filterList() {
      return this.tableList.map((item, index) => {
        return {
          businessTitel: item.businessTitel,
          imgType: item.imgType,
          fileSize: item.fileSize,
          fileExtensions: item.fileExtensions,
          location: item.location,
          originalPic: item.originalPic,
          remark: item.remark,
        };
      });
    },
  },
  methods: {
    setHeaders(head) {
      let str = "";
      switch (head) {
        case "businessTitel":
          str = "业务名称";
          break;
        case "imgType":
          str = "图片类型";
          break;
        case "fileSize":
          str = "文件大小";
          break;
        case "fileExtensions":
          str = "文件后缀";
          break;
        case "location":
          str = "图片位置";
          break;
        case "originalPic":
          str = "原图";
          break;
        case "remark":
          str = "备注";
      }
      return str;
    },
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    handleClick(head, name, key) {
      console.log(head, name, key);
    },
    indexMethod(index) {
      return index + 1;
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
