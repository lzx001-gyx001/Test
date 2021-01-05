<!--  -->
<template>
  <el-table
    :key="0"
    v-loading="listLoading"
    :data="userList"
    border
    fit
    highlight-current-row
    style="width: 100%"
  >
    <!-- 序号 -->
    <el-table-column
      label="序号"
      type="index"
      :index="indexMethod"
      align="center"
      width="100"
    >
    </el-table-column>
    <!--名称 -->
    <el-table-column label="用户名" prop="account" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.account }}</span>
      </template>
    </el-table-column>
    <!--分类-->
    <el-table-column label="账户类型" prop="userType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.userType }}</span>
      </template>
    </el-table-column>
    <!--访问地址 -->
    <el-table-column label="访问地址" prop="cuser" align="center" width="95">
      <template slot-scope="{ row }">
        <span>{{ row.url }}</span>
      </template>
    </el-table-column>
    <!-- 目标 -->
    <el-table-column label="目标" width="150px" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.target }}</span>
      </template>
    </el-table-column>
    <!-- 层次 -->
    <el-table-column label="层次" prop="utime" class-name="status-col" width="100">
      <template slot-scope="{ row }">
        <span>{{ row.zIndex }}</span>
      </template>
    </el-table-column>
    <!-- 有效 -->
    <el-table-column label="有效" prop="utime" width="150px" align="center">
      <template slot-scope="{ row }">
        <el-checkbox v-model="row.iswork"></el-checkbox>
      </template>
    </el-table-column>
    <!-- 说明 -->
    <el-table-column label="说明" prop="utime" width="150px" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.tips }}</span>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      :label="$t('table.actions')"
      align="center"
      width="230"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row, $index }">
        <!-- 编辑按钮 -->
        <el-button
          ref="dataForm"
          type="primary"
          size="mini"
          @click="handleUpdate(row, $index)"
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
  computed: {
    userList() {
      return this.tableList.map((item) => item.user);
    },
  },
  props: ["tableList", "listLoading"],
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  methods: {
    //点击【表格编辑按钮】
    handleUpdate(row, index) {
      let tempData = {
        ...this.tableList[index],
      };
      this.$emit("handleUpdate", tempData);
    },
    //点击【表格删除按钮】
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    indexMethod(index) {
      return +index + 1;
    },
    //
    handleSelectionChange() {},
    handleTest(row) {
      console.log(row);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
