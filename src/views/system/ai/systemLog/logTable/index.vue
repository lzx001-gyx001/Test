<!--系统日志右侧表格  -->
<template>
  <el-row>
    <el-table
      :key="0"
      v-loading="listLoading"
      :data="tableList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- 序号 -->
      <el-table-column
        :label="$t('table.id')"
        prop="sortCode"
        align="center"
        width="80px"
      >
        <template slot-scope="{ row }">
          <span>{{ filterSortCode(row.sortCode) }}</span>
        </template>
      </el-table-column>
      <!-- 操作时间(带排序) -->
      <el-table-column
        label="操作时间"
        prop="createDate"
        align="center"
        sortable
      >
        <template slot-scope="{ row }">
          <span>{{ row.createDate }}</span>
        </template>
      </el-table-column>
      <!-- 操作模块 -->
      <el-table-column label="操作模块" width="80" prop="module" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.module }}</span>
        </template>
      </el-table-column>
      <!-- 操作类型名称 -->
      <el-table-column label="操作类型名称" prop="logType" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.logType }}</span>
        </template>
      </el-table-column>
        <!-- ip地址 -->
      <el-table-column label="ip地址" prop="ipAddressCode" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.ipAddressCode }}</span>
        </template>
      </el-table-column>
              <!-- 操作用户 -->
      <el-table-column label="操作用户" prop="createUser" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.createUser }}</span>
        </template>
      </el-table-column>
               <!-- 操作公司 -->
      <el-table-column label="操作公司" prop="company" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.company }}</span>
        </template>
      </el-table-column>
                <!-- 操作部门 -->
      <el-table-column label="操作部门" prop="company" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.company }}</span>
        </template>
      </el-table-column>
                <!-- 操作状态 -->
      <el-table-column label="操作状态" prop="status" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

                 <!-- 对象值 -->
      <el-table-column label="操作状态" prop="object" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.object }}</span>
        </template>
      </el-table-column>

                  <!-- 操作描述 -->
      <el-table-column label="操作描述" prop="remark" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
import { handleFilterSortCode } from "@/utils/myUtils/filterSortCode";
export default {
  components: {},
  props: {
    listLoading: {
      type: Boolean,
      required: true,
      default: true,
    },
    tableList: {
      type: Array,
      required: true,
      default: [],
    },
  },
  computed: {},

  data() {
    //这里存放数据
    return {};
  },
  methods: {
    //辅助函数,过滤sortCode前面的000
    filterSortCode(sortCode) {
      return handleFilterSortCode(sortCode);
    },
  },
  created() {
  },
  updated(){
      console.log("子组件打印:更新")
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang='scss' scoped>
</style>