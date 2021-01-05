<!-- 内容表格 -->
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
    <el-table-column :label="$t('table.id')" prop="" align="center" width="50px">
      <template slot-scope="{}">
        <span>{{}}</span>
      </template>
    </el-table-column>

    <!-- 栏目编码-->
    <!-- <el-table-column label="栏目编码" prop="sysmenuId" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.sysmenuId }}</span>
      </template>
    </el-table-column> -->
    <!-- 栏目名称 -->
    <el-table-column label="业务名称" prop="businessTitel" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.businessTitel }}</span>
      </template>
    </el-table-column>
    <!-- 栏目名称蒙语 -->
    <!-- <el-table-column label="栏目名称蒙语" width="120px" prop="sysmenuMgl" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.sysmenuMgl }}</span>
      </template>
    </el-table-column> -->
    <!-- 图片对应类型 -->
    <el-table-column
      label="图片类型"
      show-overflow-tooltip
      prop="contentTitle"
      align="center"
    >
      <template slot-scope="{ row }">
        <span>{{ row.contentTitle }}</span>
      </template>
    </el-table-column>
    <!-- 新闻副标题 -->
    <el-table-column label="新闻副标题" prop="contenSubTitle" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.contentTitle }}</span>
      </template>
    </el-table-column>
    <!-- 新闻内容 -->
    <el-table-column label="新闻内容" prop="content" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.content }}</span>
      </template>
    </el-table-column>
    <!-- 内容类型 -->
    <el-table-column label="内容类型" prop="contentType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.contentType }}</span>
      </template>
    </el-table-column>
    <!-- 摘要 -->
    <el-table-column label="摘要" prop="abstract" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.abstract }}</span>
      </template>
    </el-table-column>
    <!-- 封面图片 -->
    <el-table-column label="封面图片" prop="location" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.location }}</span>
      </template>
    </el-table-column>

    <!-- 备注 -->
    <el-table-column label="备注" prop="remark" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.remark }}</span>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column
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
  methods: {
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
