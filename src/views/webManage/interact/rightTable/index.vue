<template>
  <el-table
    border
    ref="dataFormEdit"
    :key="0"
    v-loading="listLoading"
    :data="tableList"
    highlight-current-row
    style="width: 100%"
  >
    <!-- 序号 -->
    <el-table-column
      type="index"
      :index="indexMethod"
      :label="$t('table.id')"
      prop=""
      align="center"
      width="50"
    >
    </el-table-column>

    <!-- 评论用户昵称 -->
    <el-table-column label="用户昵称" prop="object" align="center" width="120">
      <template slot-scope="{ row }">
        <span>{{ row.object }}</span>
      </template>
    </el-table-column>
    <!-- 用户主页 -->
    <el-table-column label="用户主页" width="80" prop="objectHome" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.objectHome }}</span>
      </template>
    </el-table-column>
    <!-- 用户头像 -->
    <el-table-column label="用户头像" width="120" prop="objectIcom" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.objectIcom }}</span>
      </template>
    </el-table-column>
    <!-- 头像位置 -->
    <el-table-column label="头像位置" prop="location" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.location }}</span>
      </template>
    </el-table-column>
    <!-- 评论内容 -->
    <el-table-column
      label="评论内容"
      show-overflow-tooltip
      prop="content"
      align="center"
      height="50"
    >
      <template slot-scope="{ row }">
        <span>{{ row.content }}</span>
      </template>
    </el-table-column>
    <!-- 来源终端 -->
    <el-table-column label="来源终端" prop="platform" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.platform }}</span>
      </template>
    </el-table-column>
    <!-- 互动方式 -->
    <el-table-column label="互动方式" prop="interactType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.interactType }}</span>
      </template>
    </el-table-column>
    <!-- 评论方式 -->
    <el-table-column label="评论方式" prop="commentType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.commentType }}</span>
      </template>
    </el-table-column>
    <!-- 分享方式 -->
    <el-table-column label="分享方式" prop="shareType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.shareType }}</span>
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
      width="230"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row }">
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
  },
  created() {},
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
