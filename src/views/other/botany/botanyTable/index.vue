<!-- 蒙医药用数据库管理 表格 -->
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

    <!-- 名称 -->
    <el-table-column label="名称" prop="botanyName" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.botanyName }}</span>
      </template>
    </el-table-column>

    <!-- 拉丁文名称 -->
    <el-table-column
      label="拉丁文名称"
      show-overflow-tooltip
      prop="latinName"
      align="center"
      width="120"
    >
      <template slot-scope="{ row }">
        <span>{{ row.latinName }}</span>
      </template>
    </el-table-column>
    <!-- 一下是乔国宝的代码 -->

    <!-- 有无封面 -->
    <!-- <el-table-column label="有无封面" prop="ifhomeImage" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.ifhomeImage == '0' ? false : true"></el-checkbox>
      </template>
    </el-table-column> -->
    <!-- 花期 -->
    <el-table-column label="花期" prop="florescence" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.florescence }}</span>
      </template>
    </el-table-column>
    <!-- 种子期 -->
    <el-table-column label="种子期" prop="seedStage" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.seedStage }}</span>
      </template>
    </el-table-column>
    <!-- 形态特征 -->
    <el-table-column label="形态特征" prop="feature" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.feature }}</span>
      </template>
    </el-table-column>

    <!-- 入药部分 -->
    <el-table-column label="入药部分" prop="medicinePart" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.medicinePart }}</span>
      </template>
    </el-table-column>
    <!-- 化学成分 -->
    <el-table-column label="化学成分" prop="component" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.component }}</span>
      </template>
    </el-table-column>
    <!-- 性味 -->
    <el-table-column label="性味" prop="taste" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.taste }}</span>
      </template>
    </el-table-column>

    <!-- 主治功能 -->
    <el-table-column label="主治功能" prop="treatEffect" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.treatEffect }}</span>
      </template>
    </el-table-column>
    <!-- 备注 -->
    <el-table-column label="备注" prop="remark" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.remark }}</span>
      </template>
    </el-table-column>
    <!-- 有效 -->
    <el-table-column label="有效" prop="enabled" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '0' ? false : true"></el-checkbox>
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
    },
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
