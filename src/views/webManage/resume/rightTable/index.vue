<template>
  <el-table
    border
    ref="data"
    :key="0"
    v-loading="listLoading"
    :data="tableList"
    highlight-current-row
    style="width: 100%"
  >
    <!-- 序号 -->
    <el-table-column
      :label="$t('table.id')"
      prop=""
      align="center"
      type="index"
      :index="indexMethod"
      width="80"
    >
    </el-table-column>

    <!-- 简历类型 -->
    <el-table-column label="简历类型" prop="resumeType" align="center" width="120">
      <template slot-scope="{ row }">
        <span>{{ row.resumeType }}</span>
      </template>
    </el-table-column>
    <!-- 开始时间 -->
    <el-table-column label="开始时间" prop="startDate" width="150" align="center">
      <template slot-scope="{ row }">
        <span>{{ formatDate(row.startDate) }}</span>
      </template>
    </el-table-column>
    <!-- 结束时间 -->
    <el-table-column label="结束时间" width="150" prop="stopDate" align="center">
      <template slot-scope="{ row }">
        <span>{{ formatDate(row.stopDate) }}</span>
      </template>
    </el-table-column>
    <!-- 单位 -->
    <el-table-column label="单位" prop="mechanism" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.mechanism }}</span>
      </template>
    </el-table-column>
    <!-- 职务 -->
    <el-table-column label="职务" prop="duties" align="center" height="50">
      <template slot-scope="{ row }">
        <span>{{ row.duties }}</span>
      </template>
    </el-table-column>
    <!-- 工作内容 -->
    <el-table-column label="工作内容" prop="jobContent" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.jobContent }}</span>
      </template>
    </el-table-column>
    <!-- 毕业学校 -->
    <el-table-column label="毕业学校" prop="school" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.school }}</span>
      </template>
    </el-table-column>
    <!-- 学历 -->
    <el-table-column label="学历" prop="education" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.education }}</span>
      </template>
    </el-table-column>
    <!-- 专业 -->
    <el-table-column label="专业" prop="major" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.major }}</span>
      </template>
    </el-table-column>
    <!-- 最高学位 -->
    <el-table-column label="最高学位" prop="degree" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.degree }}</span>
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
        <el-button
          ref="dataFormEditBtn"
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
import { format } from "@/utils/myUtils/formatDate";
export default {
  computed: {},
  props: {
    listLoading: {
      type: Boolean,
      default: false,
      required: true,
    },
    tableList: {
      type: Array,
      default: () => [],
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
    handleUpdate(row) {
      this.$emit("handleUpdate", row);
    },
    formatDate(item) {
      return format(item);
    },
    indexMethod(index) {
      return +index + 1;
    },
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.dataForm.clearValidate();
    // });
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
