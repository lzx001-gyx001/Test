<!--  -->
<template>
  <el-table :key="0" :data="list" border fit highlight-current-row style="width: 100%">
    <!-- 序号 -->
    <el-table-column
      label="序号"
      prop="sortCode"
      align="center"
      width="80px"
      type="index"
      :index="indexMethod"
    >
    </el-table-column>

    <!--项目名称 -->
    <el-table-column label="项目名称" prop="fullName" align="center" width="150px">
      <template slot-scope="{ row }">
        <span>{{ row.fullName }}</span>
      </template>
    </el-table-column>
    <!--项目值 -->
    <el-table-column label="项目值" prop="code" width="110px" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.code }}</span>
      </template>
    </el-table-column>
    <!--有效-->
    <el-table-column label="有效" prop="enabled" width="80px" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column>
    <!--创建用户 -->
    <el-table-column label="创建用户" prop="createUser" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.createUser }}</span>
      </template>
    </el-table-column>
    <!-- 创建日期 -->
    <el-table-column label="创建日期" align="center" prop="createDate">
      <template slot-scope="{ row }">
        <span>{{ row.createDate | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
      </template>
    </el-table-column>
    <!-- 修改用户 -->
    <el-table-column
      label="修改用户"
      prop="modifyUser"
      class-name="status-col"
      width="100"
    >
      <template slot-scope="{ row }">
        <span>{{ row.modifyUser }}</span>
      </template>
    </el-table-column>
    <!-- 修改时间 -->
    <el-table-column label="修改时间" prop="modifyDate" width="150px" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.modifyDate | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
      :label="$t('table.actions')"
      align="center"
      width="230px"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row, $index }">
        <!-- 新增 -->
        <!-- <el-button @click="handleDetailAdd"> 新增 </el-button> -->

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
          @click="handleDelete(row, $index)"
          >{{ "删除" }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
    },
  },
  components: {},
  data() {
    //这里存放数据
    return {
      index: 0, //默认序号
    };
  },
  methods: {
    //辅助函数,用于处理sortCode
    handleFilterSortCode(sortCode) {
      return sortCode.replace(/\b(0+)/gi, "");
    },
    handleUpdate(row) {
      this.$emit("handleUpdate", row);
    },
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    //排序用函数
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
