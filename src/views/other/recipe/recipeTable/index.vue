<!-- 内容表格 -->
<template>
  <el-table
    ref="dataTable"
    :key="0"
    v-loading="listLoading"
    :data="tableList"
    highlight-current-row
    border
    style="width: 100%"
  >
    <!-- 序号 -->
    <el-table-column
      :label="$t('table.id')"
      prop=""
      align="center"
      type="index"
      :index="indexMethod"
      width="80px"
    >
    </el-table-column>

    <!-- 方剂名称 -->
    <el-table-column label="方剂名称" prop="recipeName" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.recipeName }}</span>
      </template>
    </el-table-column>

    <!-- 封面图片 -->
    <el-table-column
      label="封面图片"
      show-overflow-tooltip
      prop="coverImg"
      align="center"
    >
      <template slot-scope="{ row }">
        <span>{{ row.coverImg }}</span>
      </template>
    </el-table-column>
    <!-- 类型
    <el-table-column label="类型" show-overflow-tooltip prop="type" align="center">
      <template slot-scope="{ row }">
        <span class="">{{ row.type }}</span>
      </template>
    </el-table-column> -->
    <!-- 来源 -->
    <el-table-column label="来源" prop="source" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.source }}</span>
      </template>
    </el-table-column>
    <!-- 方剂类型 -->
    <el-table-column label="方剂类型" prop="recipeType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.recipeType }}</span>
      </template>
    </el-table-column>
    <!-- 主要成分 -->
    <el-table-column label="主要成分" prop="mainComponent" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.mainComponent }}</span>
      </template>
    </el-table-column>
    <!-- 主治器官 -->
    <el-table-column label="主治器官" prop="treatOrgan" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.treatOrgan }}</span>
      </template>
    </el-table-column>
    <!-- 功能主治 -->
    <el-table-column label="功能主治" prop="treatEffect" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.treatEffect }}</span>
      </template>
    </el-table-column>
    <!-- 企业名称 -->
    <el-table-column label="企业名称" prop="factoryName" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.factoryName }}</span>
      </template>
    </el-table-column>

    <!-- 操作 -->
    <el-table-column
      :label="$t('table.actions')"
      align="center"
      width="230"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row }">
        <!-- 新增 -->
        <!-- 编辑按钮 -->
        <el-button
          ref="dataFormEdit"
          type="primary"
          size="mini"
          @click="handleUpdate(row)"
          >{{ $t("table.edit") }}</el-button
        >

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
  methods: {
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    indexMethod(index) {
      return +index + 1;
    },
    handleUpdate(row) {
      this.$emit("handleUpdate", row);
      // this.$nextTick(() => {
      //   this.$refs.dataFormEdit.clearValidate();
      // });

      // this.$refs.dataFormEdit.validate((valid) => {
      //   if (valid) {
      //     this.$nextTick(() => {
      //       this.$refs.upload.clearFiles();
      //     });
      //     this.dialogFormVisible = false;
      //   }
      // });
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
