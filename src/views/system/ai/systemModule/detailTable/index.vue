<!--  -->
<template>
  <el-table :key="0" :data="data" border fit highlight-current-row style="width: 100%">
    <!-- 序号 -->
    <el-table-column
      :label="$t('table.id')"
      prop="sortCode"
      align="center"
      width="80px"
      :index="indexMethod"
      type="index"
    >
    </el-table-column>

    <!--编码 -->
    <el-table-column
      label="编码"
      prop="moduleCode"
      min-width="150px"
      width="100"
      align="center"
    >
      <template slot-scope="{ row }">
        <span>{{ row.moduleCode }}</span>
      </template>
    </el-table-column>
    <!--名称 -->
    <el-table-column label="名称" prop="fullName" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.fullName }}</span>
      </template>
    </el-table-column>
    <!--分类-->
    <el-table-column label="分类" prop="category" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.category }}</span>
      </template>
    </el-table-column>
    <!--访问地址 -->
    <el-table-column label="访问地址" prop="pageLocation" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.pageLocation }}</span>
      </template>
    </el-table-column>
    <!-- 目标 -->
    <el-table-column label="目标" width="150px" align="center" prop="target">
      <template slot-scope="{ row }">
        <span>{{ row.target }}</span>
      </template>
    </el-table-column>
    <!-- 层次 -->
    <el-table-column label="层次" prop="level" class-name="status-col">
      <template slot-scope="{ row }">
        <span>{{ row.level }}</span>
      </template>
    </el-table-column>
    <!-- 选项 -->
    <el-table-column label="有效" width="80" prop="enabled" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column>
    <!-- 说明 -->
    <el-table-column label="说明" prop="remark" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.remark }}</span>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      :label="$t('table.actions')"
      align="center"
      class-name="small-padding fixed-width"
      width="230"
    >
      <template slot-scope="{ row, $index }">
        <!-- 编辑按钮 -->
        <el-button
          ref="dataFormEdit"
          type="primary"
          size="mini"
          @click="handleUpdate(row)"
          >{{ $t("table.edit") }}</el-button
        >

        <!-- 删除按钮 -->
        <el-button
          v-if="row.status != 'deleted'"
          size="mini"
          type="danger"
          @click="handleDelete(row)"
          >{{ "删除" }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    //这里存放数据
    return {};
  },
  methods: {
    handleUpdate(row) {
      this.$emit("handleUpdate", row);
    },
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    indexMethod(index) {
      return +index + 1;
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
