<!--  -->
<template>
  <el-table
    ref="rightTable"
    :key="0"
    :data="data"
    border
    fit
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
  >
    <!-- 序号 -->
    <el-table-column
      :label="$t('table.id')"
      prop="id"
      type="index"
      :index="indexMethod"
      align="center"
      width="80"
    >
    </el-table-column>
    <!--编码 -->
    <el-table-column label="编码" prop="roleCode" width="90" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.roleCode }}</span>
      </template>
    </el-table-column>
    <!--名称 -->
    <el-table-column label="角色" prop="fullName" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.fullName }}</span>
      </template>
    </el-table-column>
    <!--分类-->
    <el-table-column label="成员个数" prop="isWork" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.class }}</span>
      </template>
    </el-table-column>
    <!--访问地址 -->
    <el-table-column label="角色分类" prop="category" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.category }}</span>
      </template>
    </el-table-column>
    <!-- 目标 -->
    <el-table-column label="所属公司" prop="parent" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.parent }}</span>
      </template>
    </el-table-column>

    <!-- 有效 -->
    <el-table-column label="有效" prop="enabled" width="90px" align="center">
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
      width="230"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row }">
        <!-- 编辑按钮 -->
        <el-button type="primary" size="mini" @click="handleUpdate(row)">{{
          $t("table.edit")
        }}</el-button>

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
  props: {
    data: {
      type: Array,
      default: [],
      required: true,
    },
  },
  components: {},
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
    //选中1行表格后的函数:选中当前的表格，传给父组件
    handleCurrentChange(nowVal, oldVal) {
      this.$emit("currentChange", nowVal);
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
